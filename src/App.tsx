import React from 'react';
import { Kanban } from 'lucide-react';

export const App: React.FC = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl mb-4 text-indigo-400">
        <Kanban className="w-12 h-12 animate-pulse" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-white mb-2">DevFlow Kanban</h1>
      <p className="text-slate-400 max-w-md text-sm leading-relaxed">
        Panel interactivo de gestión ágil de sprints y tareas para equipos de ingeniería de
        software.
      </p>
    </main>
  );
};

export default App;
