import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SprintSummary } from './SprintSummary';
import { TaskModal } from '../kanban/TaskModal';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#090d16] text-slate-100 font-sans">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <Header />

        {/* Sprint Summary Bar */}
        <SprintSummary />

        {/* Scrollable Main Board Area */}
        <main className="flex-1 overflow-x-auto overflow-y-hidden p-6 bg-[#090d16]">
          {children}
        </main>
      </div>

      {/* Task Create/Edit Modal Drawer */}
      <TaskModal />
    </div>
  );
};
