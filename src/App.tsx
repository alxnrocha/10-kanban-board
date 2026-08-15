import React from 'react';
import { AppLayout } from './components/layout';
import { useKanbanStore } from './store/kanbanStore';
import { Kanban } from 'lucide-react';

export const App: React.FC = () => {
  const { columns, tasks } = useKanbanStore();

  return (
    <AppLayout>
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-8 bg-[#111726]/60 border border-[#1d273b] rounded-2xl max-w-md shadow-xl backdrop-blur-sm">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-4 shadow-sm shadow-indigo-950">
            <Kanban className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="text-lg font-bold text-white mb-1.5">Estructura Base del Tablero</h2>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            {columns.length} columnas configuradas y {tasks.length} tarjetas cargadas en memoria. En
            la siguiente issue renderizaremos las columnas interactivas.
          </p>
          <div className="flex justify-center gap-2">
            {columns.map((c) => (
              <span
                key={c.id}
                className="text-[10px] font-semibold px-2 py-1 rounded-md bg-[#182235] border border-[#243046] text-slate-300"
              >
                {c.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default App;
