import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, Plus, ChevronDown, Calendar, X, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { useKanbanStore } from '../../store/kanbanStore';
import type { Priority, TaskType } from '../../types/kanban';

export const Header: React.FC = () => {
  const {
    filters,
    setSearch,
    setPriorityFilter,
    setTypeFilter,
    setAssigneeFilter,
    resetFilters,
    openNewTaskModal,
    sprint,
    users,
  } = useKanbanStore();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close filter dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate active filter count
  let activeFilterCount = 0;
  if (filters.priority !== 'all') activeFilterCount++;
  if (filters.type !== 'all') activeFilterCount++;
  if (filters.assigneeId !== 'all') activeFilterCount++;
  if (filters.tagId !== 'all') activeFilterCount++;

  const priorityOptions: { label: string; value: Priority | 'all' }[] = [
    { label: 'Todas las prioridades', value: 'all' },
    { label: 'Urgente', value: 'urgent' },
    { label: 'Alta', value: 'high' },
    { label: 'Media', value: 'medium' },
    { label: 'Baja', value: 'low' },
  ];

  const typeOptions: { label: string; value: TaskType | 'all' }[] = [
    { label: 'Todos los tipos', value: 'all' },
    { label: 'Feature', value: 'feature' },
    { label: 'Bug', value: 'bug' },
    { label: 'Task', value: 'task' },
    { label: 'Refactor', value: 'refactor' },
  ];

  return (
    <header className="h-16 px-6 border-b border-[#1a2234] bg-[#090d16] flex items-center justify-between gap-4 select-none">
      {/* Search Input Box */}
      <div className="flex-1 max-w-md relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 absolute left-3.5 text-slate-400 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar tareas, tickets, etiquetas..."
            className="w-full bg-[#111726] text-slate-100 placeholder:text-slate-500 text-xs rounded-xl pl-9 pr-14 py-2 border border-[#1d273b] hover:border-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500/30 transition-all duration-150 shadow-inner"
          />
          {filters.search ? (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 text-slate-400 hover:text-white"
              aria-label="Borrar búsqueda"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="absolute right-2.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-[#182235] border border-[#232e44] text-[10px] font-mono text-slate-400">
              <span className="text-[11px]">⌘</span>K
            </div>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Sprint Selector Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111726] border border-[#1d273b] hover:border-slate-700 transition-colors cursor-pointer group">
          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-xs font-semibold text-white">{sprint.name}</span>
          <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-200" />
          <span className="ml-1 pl-2 border-l border-slate-700 text-[11px] text-slate-400 font-medium">
            {sprint.startDate} – {sprint.endDate}
          </span>
        </div>

        {/* Filter Button & Popover */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
              activeFilterCount > 0
                ? 'bg-indigo-950/40 border-indigo-500/50 text-indigo-300'
                : 'bg-[#111726] border-[#1d273b] text-slate-300 hover:text-white hover:border-slate-700'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span>Filtros</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Filter Dropdown Popover */}
          {isFilterOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 p-4 bg-[#111726] border border-[#232e44] rounded-2xl shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-white">Filtrar tablero</span>
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 cursor-pointer"
                  >
                    Restablecer
                  </button>
                )}
              </div>

              {/* Priority Filter */}
              <div className="mb-3">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Prioridad
                </label>
                <div className="grid grid-cols-2 gap-1">
                  {priorityOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setPriorityFilter(opt.value)}
                      className={`px-2 py-1 rounded-md text-xs text-left transition-colors flex items-center justify-between ${
                        filters.priority === opt.value
                          ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                          : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {filters.priority === opt.value && (
                        <Check className="w-3 h-3 text-indigo-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div className="mb-3">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Tipo de tarea
                </label>
                <div className="grid grid-cols-2 gap-1">
                  {typeOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setTypeFilter(opt.value)}
                      className={`px-2 py-1 rounded-md text-xs text-left transition-colors flex items-center justify-between ${
                        filters.type === opt.value
                          ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                          : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {filters.type === opt.value && <Check className="w-3 h-3 text-indigo-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Assignee Filter */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Asignado a
                </label>
                <div className="space-y-1">
                  <button
                    onClick={() => setAssigneeFilter('all')}
                    className={`w-full px-2 py-1 rounded-md text-xs text-left transition-colors flex items-center justify-between ${
                      filters.assigneeId === 'all'
                        ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <span>Todos los miembros</span>
                    {filters.assigneeId === 'all' && <Check className="w-3 h-3 text-indigo-400" />}
                  </button>
                  {users.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => setAssigneeFilter(u.id)}
                      className={`w-full px-2 py-1 rounded-md text-xs text-left transition-colors flex items-center justify-between ${
                        filters.assigneeId === u.id
                          ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                          : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={u.avatarUrl}
                          alt={u.name}
                          className="w-4 h-4 rounded-full object-cover"
                        />
                        <span>{u.name}</span>
                      </div>
                      {filters.assigneeId === u.id && <Check className="w-3 h-3 text-indigo-400" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Primary Action Button */}
        <Button
          onClick={() => openNewTaskModal('col-todo')}
          variant="primary"
          size="sm"
          className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-md shadow-indigo-950/70 border-indigo-400/30 font-semibold px-3.5 h-8.5 rounded-xl"
        >
          <Plus className="w-4 h-4 mr-0.5" />
          <span>Nueva Tarea</span>
          <ChevronDown className="w-3.5 h-3.5 ml-0.5 opacity-80" />
        </Button>
      </div>
    </header>
  );
};
