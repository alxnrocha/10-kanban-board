import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskCard } from '../components/kanban/TaskCard';
import { useKanbanStore } from '../store/kanbanStore';
import type { Task } from '../types/kanban';

const mockTask: Task = {
  id: 'task-test-1',
  code: 'DEV-999',
  title: 'Implementar autenticación OAuth 2.0',
  description: 'Test description',
  type: 'feature',
  priority: 'high',
  storyPoints: 8,
  columnId: 'col-todo',
  position: 0,
  createdAt: '2026-05-12T10:00:00Z',
  updatedAt: '2026-05-12T10:00:00Z',
  tags: [{ id: 'tag-auth', name: 'auth', color: '#6366f1' }],
  subtasks: [
    { id: 'st-1', title: 'Configurar endpoints', isCompleted: true },
    { id: 'st-2', title: 'Testear tokens JWT', isCompleted: false },
  ],
  assignee: {
    id: 'user-diego',
    name: 'Diego García',
    role: 'Tech Lead',
    email: 'diego@devflow.io',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
  },
};

describe('TaskCard Component', () => {
  it('renders task code, title, story points and badges correctly', () => {
    render(<TaskCard task={mockTask} />);

    expect(screen.getByText('DEV-999')).toBeInTheDocument();
    expect(screen.getByText('Implementar autenticación OAuth 2.0')).toBeInTheDocument();
    expect(screen.getByText('Feature')).toBeInTheDocument();
    expect(screen.getByText('Alta')).toBeInTheDocument();
    expect(screen.getByText('8 pts')).toBeInTheDocument();
    expect(screen.getByText('1/2')).toBeInTheDocument(); // subtasks progress
  });

  it('triggers task selection on click', async () => {
    const user = userEvent.setup();
    render(<TaskCard task={mockTask} />);

    const card = screen.getByRole('button', { name: /DEV-999/i });
    await user.click(card);

    expect(useKanbanStore.getState().selectedTaskId).toBe('task-test-1');
  });
});
