import React from 'react';
import { Flag, ArrowUp, CheckCircle2 } from 'lucide-react';
import type { Task, Priority, TaskType } from '../../types/kanban';
import { useKanbanStore } from '../../store/kanbanStore';
import { cn } from '../../utils/cn';

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, isDragging = false }) => {
  const selectTask = useKanbanStore((s) => s.selectTask);

  const completedSubtasks = task.subtasks.filter((st) => st.isCompleted).length;
  const totalSubtasks = task.subtasks.length;
  const hasSubtasks = totalSubtasks > 0;
  const subtaskProgress = hasSubtasks ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  // Task type styling matching design.png
  const renderTypeBadge = (type: TaskType) => {
    switch (type) {
      case 'feature':
        return (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-500/15 text-purple-300 border border-purple-500/30">
            Feature
          </span>
        );
      case 'bug':
        return (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-red-500/15 text-red-300 border border-red-500/30">
            Bug
          </span>
        );
      case 'task':
      case 'refactor':
      case 'docs':
      default:
        if (task.columnId === 'col-done') {
          return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
        }
        return (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-300 border border-blue-500/30">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        );
    }
  };

  // Priority indicator matching design.png
  const renderPriority = (priority: Priority) => {
    switch (priority) {
      case 'urgent':
        return (
          <div className="flex items-center gap-1 text-red-400 font-semibold">
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Urgente</span>
          </div>
        );
      case 'high':
        return (
          <div className="flex items-center gap-1 text-red-400 font-medium">
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Alta</span>
          </div>
        );
      case 'medium':
        return (
          <div className="flex items-center gap-1 text-amber-400 font-medium">
            <Flag className="w-3 h-3 fill-amber-400/20" />
            <span>Media</span>
          </div>
        );
      case 'low':
      default:
        return (
          <div className="flex items-center gap-1 text-emerald-400 font-medium">
            <Flag className="w-3 h-3 fill-emerald-400/20" />
            <span>Baja</span>
          </div>
        );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectTask(task.id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => selectTask(task.id)}
      onKeyDown={handleKeyDown}
      aria-label={`Tarjeta ${task.code}: ${task.title}, Tipo ${task.type}, Prioridad ${task.priority}, ${task.storyPoints} story points`}
      className={cn(
        'group bg-[#131c31] border border-[#1e2c47] rounded-xl p-3.5 shadow-sm transition-all duration-150 cursor-pointer select-none',
        'hover:border-slate-600 hover:bg-[#16213a] hover:shadow-md hover:shadow-black/50',
        'focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none',
        isDragging && 'card-dragging'
      )}
    >
      {/* Top Row: Code + Type Badge */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="font-mono text-[11px] font-semibold text-slate-400 tracking-tight">
          {task.code}
        </span>
        <div>{renderTypeBadge(task.type)}</div>
      </div>

      {/* Task Title */}
      <h4 className="text-xs font-semibold text-slate-100 leading-snug tracking-tight mb-3 group-hover:text-white transition-colors">
        {task.title}
      </h4>

      {/* Subtasks Progress Bar (if subtasks exist) */}
      {hasSubtasks && (
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-1.5 bg-slate-800/90 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-400 rounded-full transition-all duration-300"
              style={{ width: `${subtaskProgress}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-slate-400 shrink-0">
            {completedSubtasks}/{totalSubtasks}
          </span>
        </div>
      )}

      {/* Bottom Metadata Row: Priority + Story Points + Assignee Avatar */}
      <div className="flex items-center justify-between pt-1 text-[11px]">
        {/* Left: Priority */}
        <div>{renderPriority(task.priority)}</div>

        {/* Right: Story Points + Assignee Avatar */}
        <div className="flex items-center gap-2.5">
          <span className="text-slate-400 font-medium">{task.storyPoints} pts</span>

          {task.assignee && (
            <img
              src={task.assignee.avatarUrl}
              alt={task.assignee.name}
              title={task.assignee.name}
              className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-700 shadow-xs"
            />
          )}
        </div>
      </div>
    </div>
  );
};
