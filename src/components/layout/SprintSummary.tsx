import React from 'react';
import { BarChart2, LayoutGrid, Grid, List, MoreHorizontal } from 'lucide-react';
import { useKanbanStore } from '../../store/kanbanStore';
import type { ViewMode } from '../../types/kanban';

export const SprintSummary: React.FC = () => {
  const { tasks, sprint, viewMode, setViewMode } = useKanbanStore();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.columnId === 'col-done').length;
  const completedPoints = tasks
    .filter((t) => t.columnId === 'col-done')
    .reduce((sum, t) => sum + t.storyPoints, 0);
  const totalPoints = tasks.reduce((sum, t) => sum + t.storyPoints, 0);
  const progressPercent = totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;

  const viewOptions: { mode: ViewMode; icon: React.ComponentType<{ className?: string }> }[] = [
    { mode: 'analytics', icon: BarChart2 },
    { mode: 'board', icon: LayoutGrid },
    { mode: 'list', icon: List },
  ];

  return (
    <div className="px-6 py-4 border-b border-[#1a2234] bg-[#090d16] flex flex-wrap items-center justify-between gap-4 select-none">
      {/* Left: Sprint Title & Stats */}
      <div className="flex flex-wrap items-center gap-6">
        <h2 className="text-sm font-bold text-white tracking-tight">Resumen del Sprint</h2>

        <div className="flex items-center gap-6 text-xs">
          {/* Tareas */}
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Tareas</span>
            <span className="font-bold text-white text-sm">{totalTasks}</span>
          </div>

          {/* Completadas */}
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Completadas</span>
            <span className="font-bold text-white text-sm">{completedTasks}</span>
          </div>

          {/* Story Points */}
          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Story Points</span>
            <span className="font-bold text-white text-sm">
              {completedPoints}{' '}
              <span className="text-slate-400 font-normal">/ {sprint.targetStoryPoints}</span>
            </span>
          </div>

          {/* Progreso */}
          <div className="min-w-[140px]">
            <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
              <span>Progreso</span>
              <span className="font-bold text-indigo-300">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-violet-400 rounded-full transition-all duration-300 shadow-xs shadow-indigo-500/50"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right: View mode toggles */}
      <div className="flex items-center gap-1 bg-[#111726] p-1 rounded-xl border border-[#1d273b]">
        {viewOptions.map((opt) => {
          const Icon = opt.icon;
          const isActive = viewMode === opt.mode;

          return (
            <button
              key={opt.mode}
              onClick={() => setViewMode(opt.mode)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isActive
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
              aria-label={`Vista ${opt.mode}`}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
        <button
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-850 transition-colors cursor-pointer"
          aria-label="Más opciones"
        >
          <Grid className="w-4 h-4" />
        </button>
        <button
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-850 transition-colors cursor-pointer"
          aria-label="Menú contextual"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
