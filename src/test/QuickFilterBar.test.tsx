import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuickFilterBar } from '../components/layout/QuickFilterBar';
import { useKanbanStore } from '../store/kanbanStore';

describe('QuickFilterBar Component', () => {
  beforeEach(() => {
    useKanbanStore.getState().resetFilters();
  });

  it('renders quick filter buttons', () => {
    render(<QuickFilterBar />);

    expect(screen.getByText(/Todos/i)).toBeInTheDocument();
    expect(screen.getByText(/Mis tareas/i)).toBeInTheDocument();
    expect(screen.getByText(/Features/i)).toBeInTheDocument();
    expect(screen.getByText(/Bugs/i)).toBeInTheDocument();
    expect(screen.getByText(/Alta Prioridad/i)).toBeInTheDocument();
  });

  it('activates and toggles filter when clicked', async () => {
    const user = userEvent.setup();
    render(<QuickFilterBar />);

    const bugsBtn = screen.getByText(/Bugs/i);
    await user.click(bugsBtn);

    expect(useKanbanStore.getState().filters.type).toBe('bug');
    expect(screen.getByText(/Limpiar filtros/i)).toBeInTheDocument();
  });
});
