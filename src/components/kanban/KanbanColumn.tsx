import React from 'react';
import { Plus } from 'lucide-react';
import type { Column, Task } from '../../types/kanban';
import { useKanbanStore } from '../../store/kanbanStore';
import { cn } from '../../utils/cn';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  children?: React.ReactNode;
  isOver?: boolean;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  column,
  tasks,
  children,
  isOver = false,
}) => {
  const openNewTaskModal = useKanbanStore((s) => s.openNewTaskModal);

  const totalPoints = tasks.reduce((sum, t) => sum + t.storyPoints, 0);

  // Badge background colors matching design.png
  const badgeColors: Record<string, string> = {
    'col-backlog': 'bg-slate-800 text-slate-300 border-slate-700',
    'col-todo': 'bg-blue-600/90 text-white shadow-xs shadow-blue-900',
    'col-in-progress': 'bg-indigo-600/90 text-white shadow-xs shadow-indigo-900',
    'col-review': 'bg-amber-600/90 text-white shadow-xs shadow-amber-900',
    'col-done': 'bg-emerald-600/90 text-white shadow-xs shadow-emerald-900',
  };

  return (
    <div
      role="region"
      aria-label={`Columna ${column.title}, ${tasks.length} tareas, ${totalPoints} story points`}
      className="w-full sm:w-80 shrink-0 flex flex-col max-h-full rounded-2xl bg-[#0c1220] border border-[#1a2336] p-3 shadow-md select-none"
    >
      {/* Column Header */}
      <div className="flex items-center justify-between px-1.5 py-1 mb-3">
        <div className="flex items-center gap-2.5">
          <h3 className="text-xs font-bold text-slate-100 tracking-tight">{column.title}</h3>
          <span
            className={cn(
              'px-2 py-0.5 rounded-full text-[11px] font-bold min-w-[20px] text-center',
              badgeColors[column.id] || 'bg-slate-800 text-slate-300'
            )}
          >
            {tasks.length}
          </span>
        </div>

        <span className="text-[11px] font-medium text-slate-400">{totalPoints} pts</span>
      </div>

      {/* Cards List Container */}
      <div
        className={cn(
          'flex-1 overflow-y-auto space-y-3 p-1 min-h-[150px] transition-colors rounded-xl',
          isOver ? 'bg-indigo-950/20 ring-2 ring-indigo-500/40' : ''
        )}
      >
        {children}

        {/* Drop placeholder box when hovering empty column during drag */}
        {isOver && tasks.length === 0 && (
          <div className="h-24 rounded-xl border-2 border-dashed border-indigo-500/40 bg-indigo-500/5 flex items-center justify-center text-xs text-indigo-300 font-medium animate-pulse">
            + Soltar aquí
          </div>
        )}
      </div>

      {/* Add Task inline button at column bottom */}
      <div className="pt-2 mt-2 border-t border-[#1a2336]/60">
        <button
          onClick={() => openNewTaskModal(column.id)}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-[#151e31] border border-transparent hover:border-[#22304d] transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Añadir tarea</span>
        </button>
      </div>
    </div>
  );
};
