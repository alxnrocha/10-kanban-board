import React from 'react';
import { AppLayout } from './components/layout';
import { KanbanBoard } from './components/kanban';
import { ProjectBadge } from './components/ProjectBadge';

export const App: React.FC = () => {
  return (
    <AppLayout>
      <KanbanBoard />
      <ProjectBadge />
    </AppLayout>
  );
};

export default App;
