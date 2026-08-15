import React, { useState } from 'react';
import {
  LayoutGrid,
  CheckSquare,
  ListTodo,
  Clock,
  BarChart3,
  Calendar,
  Users,
  Tag,
  Settings,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useKanbanStore } from '../../store/kanbanStore';

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [activeItem, setActiveItem] = useState('Tablero');
  const [activeProject, setActiveProject] = useState('Plataforma Web');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const users = useKanbanStore((s) => s.users);
  const currentUser = users[0]; // Diego García

  const navItems = [
    { label: 'Tablero', icon: LayoutGrid },
    { label: 'Mis tareas', icon: CheckSquare },
    { label: 'Backlog', icon: ListTodo },
    { label: 'Sprints', icon: Clock },
    { label: 'Informes', icon: BarChart3 },
    { label: 'Calendario', icon: Calendar },
    { label: 'Equipos', icon: Users },
    { label: 'Etiquetas', icon: Tag },
    { label: 'Ajustes', icon: Settings },
  ];

  const projects = [
    { name: 'Plataforma Web', color: 'bg-indigo-500' },
    { name: 'Mobile App', color: 'bg-slate-600' },
    { name: 'API Core', color: 'bg-slate-600' },
  ];

  return (
    <>
      {/* Mobile Hamburger toggle button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:text-white"
        aria-label="Abrir menú de navegación"
      >
        {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed lg:static top-0 bottom-0 left-0 z-40 w-64 bg-[#0b0f19] border-r border-[#1a2234] flex flex-col justify-between transition-transform duration-200 ease-in-out select-none',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          className
        )}
      >
        {/* Top Header Logo */}
        <div>
          <div className="flex items-center gap-3 px-6 py-5 border-b border-[#1a2234]/80">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-400 flex items-center justify-center shadow-md shadow-indigo-950/60 ring-1 ring-white/20">
              <div className="w-4 h-4 rounded-xs border-2 border-white/90 transform rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-base tracking-tight">DevFlow</span>
              </div>
              <span className="text-[11px] font-medium text-slate-400 tracking-wide uppercase">
                Kanban
              </span>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="px-3 py-4 space-y-1" aria-label="Navegación principal">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.label;

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setActiveItem(item.label);
                    setIsMobileOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 text-left',
                    isActive
                      ? 'bg-indigo-600/90 text-white shadow-sm shadow-indigo-950 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                  )}
                >
                  <Icon className={cn('w-4 h-4', isActive ? 'text-white' : 'text-slate-400')} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Projects Section */}
          <div className="px-5 pt-4 mt-2 border-t border-[#1a2234]/80">
            <h4 className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2.5">
              Proyectos
            </h4>
            <div className="space-y-1">
              {projects.map((proj) => (
                <button
                  key={proj.name}
                  onClick={() => setActiveProject(proj.name)}
                  className={cn(
                    'w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium transition-all duration-150 text-left',
                    activeProject === proj.name
                      ? 'text-slate-100 bg-slate-900/70 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                  )}
                >
                  <span
                    className={cn(
                      'w-2 h-2 rounded-xs transition-colors',
                      activeProject === proj.name ? 'bg-indigo-400' : 'bg-slate-600'
                    )}
                  />
                  <span>{proj.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Profile Footer */}
        <div className="p-3 border-t border-[#1a2234]/80 bg-[#090d16]/50">
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-900/60 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={currentUser?.avatarUrl}
                  alt={currentUser?.name || 'Usuario'}
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-700"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-white group-hover:text-indigo-300 transition-colors">
                  {currentUser?.name || 'Diego García'}
                </div>
                <div className="text-[10px] text-slate-400">{currentUser?.role || 'Tech Lead'}</div>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-300" />
          </div>
        </div>
      </aside>
    </>
  );
};
