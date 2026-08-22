import { ProjectBadge } from './components/ProjectBadge';
import React from 'react';
import { AppLayout } from './components/layout';
import { KanbanBoard } from './components/kanban';

export const App: React.FC = () => {
  return (
    <AppLayout>
      <KanbanBoard />
    </AppLayout>
  );
};

export default App;
