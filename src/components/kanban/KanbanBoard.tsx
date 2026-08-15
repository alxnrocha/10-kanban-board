import React from 'react';
import { useKanbanStore } from '../../store/kanbanStore';
import { KanbanColumn } from './KanbanColumn';

export const KanbanBoard: React.FC = () => {
  const { columns, tasks, filters } = useKanbanStore();

  // Apply active filters (search, priority, type, assignee, tag)
  const filteredTasks = tasks.filter((task) => {
    // Search query
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(q);
      const matchesCode = task.code.toLowerCase().includes(q);
      const matchesDesc = task.description?.toLowerCase().includes(q);
      const matchesTags = task.tags.some((t) => t.name.toLowerCase().includes(q));
      if (!matchesTitle && !matchesCode && !matchesDesc && !matchesTags) return false;
    }

    // Priority filter
    if (filters.priority !== 'all' && task.priority !== filters.priority) {
      return false;
    }

    // Type filter
    if (filters.type !== 'all' && task.type !== filters.type) {
      return false;
    }

    // Assignee filter
    if (filters.assigneeId !== 'all' && task.assignee?.id !== filters.assigneeId) {
      return false;
    }

    // Tag filter
    if (filters.tagId !== 'all' && !task.tags.some((t) => t.id === filters.tagId)) {
      return false;
    }

    return true;
  });

  return (
    <div className="h-full flex gap-5 overflow-x-auto pb-4 kanban-scroll items-start select-none">
      {columns.map((column) => {
        const columnTasks = filteredTasks
          .filter((t) => t.columnId === column.id)
          .sort((a, b) => a.position - b.position);

        return (
          <KanbanColumn key={column.id} column={column} tasks={columnTasks}>
            {columnTasks.map((task) => (
              <div
                key={task.id}
                className="p-3 bg-[#131c31] border border-[#1f2c47] rounded-xl hover:border-slate-600 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-[11px] text-slate-400 font-semibold">
                    {task.code}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    {task.type}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-white leading-snug">{task.title}</h4>
              </div>
            ))}
          </KanbanColumn>
        );
      })}
    </div>
  );
};
