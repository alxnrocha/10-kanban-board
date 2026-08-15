import React from 'react';
import { Sparkles, Bug, ArrowUp, RefreshCw, UserCheck, X } from 'lucide-react';
import { useKanbanStore } from '../../store/kanbanStore';

export const QuickFilterBar: React.FC = () => {
  const {
    filters,
    setTypeFilter,
    setPriorityFilter,
    setAssigneeFilter,
    resetFilters,
    resetToMockData,
    users,
    tasks,
  } = useKanbanStore();

  const isFiltered =
    filters.search !== '' ||
    filters.priority !== 'all' ||
    filters.type !== 'all' ||
    filters.assigneeId !== 'all' ||
    filters.tagId !== 'all';

  const myUserId = users[0]?.id; // Diego García

  return (
    <div className="px-6 py-2 bg-[#090d16] border-b border-[#1a2234]/60 flex flex-wrap items-center justify-between gap-3 text-xs select-none">
      {/* Quick Filter Chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
          Filtros rápidos:
        </span>

        {/* All */}
        <button
          onClick={resetFilters}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            !isFiltered
              ? 'bg-slate-800 text-white border border-slate-700'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
          }`}
        >
          Todos ({tasks.length})
        </button>

        {/* My Tasks */}
        <button
          onClick={() => setAssigneeFilter(filters.assigneeId === myUserId ? 'all' : myUserId)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
            filters.assigneeId === myUserId
              ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50 shadow-xs'
              : 'bg-[#111726] text-slate-400 border-[#1f2c47] hover:text-slate-200'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Mis tareas</span>
        </button>

        {/* Features */}
        <button
          onClick={() => setTypeFilter(filters.type === 'feature' ? 'all' : 'feature')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
            filters.type === 'feature'
              ? 'bg-purple-600/30 text-purple-300 border-purple-500/50 shadow-xs'
              : 'bg-[#111726] text-slate-400 border-[#1f2c47] hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Features</span>
        </button>

        {/* Bugs */}
        <button
          onClick={() => setTypeFilter(filters.type === 'bug' ? 'all' : 'bug')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
            filters.type === 'bug'
              ? 'bg-red-600/30 text-red-300 border-red-500/50 shadow-xs'
              : 'bg-[#111726] text-slate-400 border-[#1f2c47] hover:text-slate-200'
          }`}
        >
          <Bug className="w-3.5 h-3.5" />
          <span>Bugs</span>
        </button>

        {/* Urgent / High */}
        <button
          onClick={() => setPriorityFilter(filters.priority === 'high' ? 'all' : 'high')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
            filters.priority === 'high'
              ? 'bg-orange-600/30 text-orange-300 border-orange-500/50 shadow-xs'
              : 'bg-[#111726] text-slate-400 border-[#1f2c47] hover:text-slate-200'
          }`}
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Alta Prioridad</span>
        </button>

        {/* Clear filter button if filtered */}
        {isFiltered && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 px-2 py-0.5 rounded cursor-pointer"
          >
            <X className="w-3 h-3" />
            <span>Limpiar filtros</span>
          </button>
        )}
      </div>

      {/* Reset Demo Data Button */}
      <button
        onClick={() => {
          if (window.confirm('¿Deseas restaurar todas las tareas y columnas al estado inicial?')) {
            resetToMockData();
          }
        }}
        className="flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-200 py-1 px-2 rounded-lg hover:bg-slate-800/60 transition-colors cursor-pointer"
        title="Restaurar datos demo de prueba"
      >
        <RefreshCw className="w-3 h-3" />
        <span>Restablecer demo</span>
      </button>
    </div>
  );
};
