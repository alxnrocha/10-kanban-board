import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Column, Task } from '../../types/kanban';
import { KanbanColumn } from './KanbanColumn';
import { DraggableTaskCard } from './DraggableTaskCard';

interface DroppableColumnProps {
  column: Column;
  tasks: Task[];
}

export const DroppableColumn: React.FC<DroppableColumnProps> = ({ column, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  });

  const taskIds = tasks.map((t) => t.id);

  return (
    <div ref={setNodeRef} className="h-full flex flex-col">
      <KanbanColumn column={column} tasks={tasks} isOver={isOver}>
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <DraggableTaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </KanbanColumn>
    </div>
  );
};
