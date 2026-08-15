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

export const KanbanBoard: React.FC = () => {
  const { columns, tasks, filters, moveTask, reorderTaskInColumn } = useKanbanStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  // Setup sensors with activation constraint to distinguish click from drag
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

    // Moving over another task in a different column
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

    // Moving over an empty column
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
      <div className="h-full flex gap-5 overflow-x-auto pb-4 kanban-scroll items-start select-none">
        {columns.map((column) => {
          const columnTasks = filteredTasks
            .filter((t) => t.columnId === column.id)
            .sort((a, b) => a.position - b.position);

          return <DroppableColumn key={column.id} column={column} tasks={columnTasks} />;
        })}
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
