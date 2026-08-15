import React from 'react';
import { useKanbanStore } from '../../store/kanbanStore';
import { KanbanColumn } from './KanbanColumn';
import { TaskCard } from './TaskCard';

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
              <TaskCard key={task.id} task={task} />
            ))}
          </KanbanColumn>
        );
      })}
    </div>
  );
};
