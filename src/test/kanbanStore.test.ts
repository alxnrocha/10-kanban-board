import { describe, it, expect, beforeEach } from 'vitest';
import { useKanbanStore } from '../store/kanbanStore';

describe('useKanbanStore', () => {
  beforeEach(() => {
    useKanbanStore.getState().resetToMockData();
  });

  it('should initialize with mock columns and tasks', () => {
    const state = useKanbanStore.getState();
    expect(state.columns.length).toBe(5);
    expect(state.tasks.length).toBeGreaterThan(0);
    expect(state.sprint.name).toBe('Sprint 24');
  });

  it('should add a new task to the specified column', () => {
    const initialCount = useKanbanStore.getState().tasks.length;

    useKanbanStore.getState().addTask({
      title: 'Nueva tarea de prueba',
      description: 'Detalle de prueba',
      type: 'feature',
      priority: 'high',
      storyPoints: 5,
      columnId: 'col-todo',
      tags: [],
      subtasks: [],
    });

    const tasks = useKanbanStore.getState().tasks;
    expect(tasks.length).toBe(initialCount + 1);

    const newTask = tasks.find((t) => t.title === 'Nueva tarea de prueba');
    expect(newTask).toBeDefined();
    expect(newTask?.columnId).toBe('col-todo');
    expect(newTask?.code).toMatch(/^DEV-\d+$/);
  });

  it('should move a task to another column', () => {
    const task = useKanbanStore.getState().tasks[0];
    expect(task).toBeDefined();

    const targetColumn = 'col-done';
    useKanbanStore.getState().moveTask(task.id, targetColumn);

    const updatedTask = useKanbanStore.getState().tasks.find((t) => t.id === task.id);
    expect(updatedTask?.columnId).toBe(targetColumn);
  });

  it('should toggle subtask completion status', () => {
    const taskWithSubtasks = useKanbanStore.getState().tasks.find((t) => t.subtasks.length > 0);

    expect(taskWithSubtasks).toBeDefined();
    if (!taskWithSubtasks) return;

    const subtask = taskWithSubtasks.subtasks[0];
    const initialStatus = subtask.isCompleted;

    useKanbanStore.getState().toggleSubtask(taskWithSubtasks.id, subtask.id);

    const updatedTask = useKanbanStore.getState().tasks.find((t) => t.id === taskWithSubtasks.id);
    const updatedSubtask = updatedTask?.subtasks.find((st) => st.id === subtask.id);

    expect(updatedSubtask?.isCompleted).toBe(!initialStatus);
  });

  it('should update and reset filter states', () => {
    useKanbanStore.getState().setSearch('auth');
    useKanbanStore.getState().setPriorityFilter('urgent');
    useKanbanStore.getState().setTypeFilter('bug');

    let filters = useKanbanStore.getState().filters;
    expect(filters.search).toBe('auth');
    expect(filters.priority).toBe('urgent');
    expect(filters.type).toBe('bug');

    useKanbanStore.getState().resetFilters();
    filters = useKanbanStore.getState().filters;
    expect(filters.search).toBe('');
    expect(filters.priority).toBe('all');
    expect(filters.type).toBe('all');
  });
});
