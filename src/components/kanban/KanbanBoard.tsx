import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragOverEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useKanbanStore } from '../../store/kanbanStore';
import { DroppableColumn } from './DroppableColumn';
import { TaskCard } from './TaskCard';
import type { Task } from '../../types/kanban';
import { cn } from '../../utils/cn';

export const KanbanBoard: React.FC = () => {
  const { columns, tasks, filters, moveTask, reorderTaskInColumn } = useKanbanStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeMobileColumnId, setActiveMobileColumnId] = useState<string>('col-todo');

  // Setup sensors with activation constraint
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Apply active filters
  const filteredTasks = tasks.filter((task) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(q);
      const matchesCode = task.code.toLowerCase().includes(q);
      const matchesDesc = task.description?.toLowerCase().includes(q);
      const matchesTags = task.tags.some((t) => t.name.toLowerCase().includes(q));
      if (!matchesTitle && !matchesCode && !matchesDesc && !matchesTags) return false;
    }

    if (filters.priority !== 'all' && task.priority !== filters.priority) {
      return false;
    }

    if (filters.type !== 'all' && task.type !== filters.type) {
      return false;
    }

    if (filters.assigneeId !== 'all' && task.assignee?.id !== filters.assigneeId) {
      return false;
    }

    if (filters.tagId !== 'all' && !task.tags.some((t) => t.id === filters.tagId)) {
      return false;
    }

    return true;
  });

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';
    const isOverColumn = over.data.current?.type === 'Column';

    if (!isActiveTask) return;

    if (isOverTask) {
      const activeTaskItem = tasks.find((t) => t.id === activeId);
      const overTaskItem = tasks.find((t) => t.id === overId);

      if (activeTaskItem && overTaskItem && activeTaskItem.columnId !== overTaskItem.columnId) {
        const overColumnTasks = tasks
          .filter((t) => t.columnId === overTaskItem.columnId)
          .sort((a, b) => a.position - b.position);

        const overIndex = overColumnTasks.findIndex((t) => t.id === overId);
        moveTask(activeId, overTaskItem.columnId, overIndex);
      }
    }

    if (isOverColumn) {
      const activeTaskItem = tasks.find((t) => t.id === activeId);
      if (activeTaskItem && activeTaskItem.columnId !== overId) {
        moveTask(activeId, overId);
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId === overId) return;

    const activeTaskItem = tasks.find((t) => t.id === activeId);
    const isOverTask = over.data.current?.type === 'Task';
    const isOverColumn = over.data.current?.type === 'Column';

    if (!activeTaskItem) return;

    if (isOverTask) {
      const overTaskItem = tasks.find((t) => t.id === overId);
      if (overTaskItem) {
        if (activeTaskItem.columnId === overTaskItem.columnId) {
          reorderTaskInColumn(activeTaskItem.columnId, activeId, overId);
        } else {
          const targetColTasks = tasks
            .filter((t) => t.columnId === overTaskItem.columnId)
            .sort((a, b) => a.position - b.position);
          const targetIndex = targetColTasks.findIndex((t) => t.id === overId);
          moveTask(activeId, overTaskItem.columnId, targetIndex);
        }
      }
    } else if (isOverColumn) {
      if (activeTaskItem.columnId !== overId) {
        moveTask(activeId, overId);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="h-full flex flex-col">
        {/* Mobile Column Tab Switcher (Visible below 640px) */}
        <div className="sm:hidden flex items-center gap-1.5 overflow-x-auto pb-3 mb-2 kanban-scroll shrink-0">
          {columns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.columnId === col.id);
            const isActive = activeMobileColumnId === col.id;

            return (
              <button
                key={col.id}
                onClick={() => setActiveMobileColumnId(col.id)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all border cursor-pointer',
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm shadow-indigo-950'
                    : 'bg-[#111726] text-slate-400 border-[#1e2a44] hover:text-slate-200'
                )}
              >
                <span>{col.title}</span>
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.2 rounded-full font-bold',
                    isActive ? 'bg-indigo-900/80 text-indigo-200' : 'bg-slate-800 text-slate-400'
                  )}
                >
                  {colTasks.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Board Columns Grid */}
        <div className="flex-1 flex gap-5 overflow-x-auto pb-4 kanban-scroll items-start select-none">
          {columns.map((column) => {
            const columnTasks = filteredTasks
              .filter((t) => t.columnId === column.id)
              .sort((a, b) => a.position - b.position);

            const isMobileHidden = activeMobileColumnId !== column.id;

            return (
              <div
                key={column.id}
                className={cn(
                  'h-full flex flex-col shrink-0',
                  'w-full sm:w-80',
                  isMobileHidden && 'hidden sm:flex'
                )}
              >
                <DroppableColumn column={column} tasks={columnTasks} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Drag Overlay */}
      <DragOverlay dropAnimation={{ duration: 200, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)' }}>
        {activeTask ? (
          <div className="rotate-2 scale-105 shadow-2xl shadow-black/80 ring-2 ring-indigo-500/50 rounded-xl cursor-grabbing">
            <TaskCard task={activeTask} isDragging />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
