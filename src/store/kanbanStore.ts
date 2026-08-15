import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Task,
  Column,
  User,
  Tag,
  Sprint,
  FilterState,
  ViewMode,
  Priority,
  TaskType,
} from '../types/kanban';
import { MOCK_COLUMNS, MOCK_TASKS, MOCK_USERS, MOCK_TAGS, MOCK_SPRINT } from '../utils/mockData';

interface KanbanState {
  columns: Column[];
  tasks: Task[];
  users: User[];
  tags: Tag[];
  sprint: Sprint;
  filters: FilterState;
  selectedTaskId: string | null;
  isNewTaskModalOpen: boolean;
  newTaskDefaultColumnId: string;
  viewMode: ViewMode;

  // Filter actions
  setSearch: (query: string) => void;
  setPriorityFilter: (priority: Priority | 'all') => void;
  setTypeFilter: (type: TaskType | 'all') => void;
  setAssigneeFilter: (assigneeId: string | 'all') => void;
  setTagFilter: (tagId: string | 'all') => void;
  resetFilters: () => void;
  setViewMode: (mode: ViewMode) => void;

  // Task manipulation
  moveTask: (taskId: string, targetColumnId: string, targetIndex?: number) => void;
  reorderTaskInColumn: (columnId: string, activeId: string, overId: string) => void;
  addTask: (taskData: Omit<Task, 'id' | 'code' | 'createdAt' | 'updatedAt' | 'position'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;

  // Subtask actions
  toggleSubtask: (taskId: string, subtaskId: string) => void;
  addSubtask: (taskId: string, title: string) => void;
  deleteSubtask: (taskId: string, subtaskId: string) => void;

  // Modal & selection
  openNewTaskModal: (defaultColumnId?: string) => void;
  closeNewTaskModal: () => void;
  selectTask: (taskId: string | null) => void;
  resetToMockData: () => void;
}

const initialFilters: FilterState = {
  search: '',
  priority: 'all',
  type: 'all',
  assigneeId: 'all',
  tagId: 'all',
};

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set) => ({
      columns: MOCK_COLUMNS,
      tasks: MOCK_TASKS,
      users: MOCK_USERS,
      tags: MOCK_TAGS,
      sprint: MOCK_SPRINT,
      filters: initialFilters,
      selectedTaskId: null,
      isNewTaskModalOpen: false,
      newTaskDefaultColumnId: 'col-todo',
      viewMode: 'board',

      setSearch: (query) => set((state) => ({ filters: { ...state.filters, search: query } })),

      setPriorityFilter: (priority) =>
        set((state) => ({ filters: { ...state.filters, priority } })),

      setTypeFilter: (type) => set((state) => ({ filters: { ...state.filters, type } })),

      setAssigneeFilter: (assigneeId) =>
        set((state) => ({ filters: { ...state.filters, assigneeId } })),

      setTagFilter: (tagId) => set((state) => ({ filters: { ...state.filters, tagId } })),

      resetFilters: () => set({ filters: initialFilters }),

      setViewMode: (viewMode) => set({ viewMode }),

      moveTask: (taskId, targetColumnId, targetIndex) =>
        set((state) => {
          const taskIndex = state.tasks.findIndex((t) => t.id === taskId);
          if (taskIndex === -1) return state;

          const updatedTask = {
            ...state.tasks[taskIndex],
            columnId: targetColumnId,
            updatedAt: new Date().toISOString(),
          };

          const otherTasks = state.tasks.filter((t) => t.id !== taskId);
          const targetColTasks = otherTasks.filter((t) => t.columnId === targetColumnId);

          let newPosition = targetColTasks.length;
          if (typeof targetIndex === 'number') {
            newPosition = targetIndex;
          }

          updatedTask.position = newPosition;

          return {
            tasks: [...otherTasks, updatedTask],
          };
        }),

      reorderTaskInColumn: (columnId, activeId, overId) =>
        set((state) => {
          const columnTasks = state.tasks
            .filter((t) => t.columnId === columnId)
            .sort((a, b) => a.position - b.position);

          const oldIndex = columnTasks.findIndex((t) => t.id === activeId);
          const newIndex = columnTasks.findIndex((t) => t.id === overId);

          if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return state;

          const reordered = [...columnTasks];
          const [moved] = reordered.splice(oldIndex, 1);
          reordered.splice(newIndex, 0, moved);

          const updatedTasks = state.tasks.map((task) => {
            if (task.columnId !== columnId) return task;
            const idx = reordered.findIndex((t) => t.id === task.id);
            return {
              ...task,
              position: idx >= 0 ? idx : task.position,
            };
          });

          return { tasks: updatedTasks };
        }),

      addTask: (taskData) =>
        set((state) => {
          const colTasks = state.tasks.filter((t) => t.columnId === taskData.columnId);
          const nextCodeNumber = state.tasks.length + 180;
          const newTask: Task = {
            ...taskData,
            id: `task-${Date.now()}`,
            code: `DEV-${nextCodeNumber}`,
            position: colTasks.length,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          return {
            tasks: [...state.tasks, newTask],
            isNewTaskModalOpen: false,
          };
        }),

      updateTask: (taskId, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
          ),
        })),

      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
          selectedTaskId: state.selectedTaskId === taskId ? null : state.selectedTaskId,
        })),

      toggleSubtask: (taskId, subtaskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id !== taskId) return task;
            return {
              ...task,
              subtasks: task.subtasks.map((st) =>
                st.id === subtaskId ? { ...st, isCompleted: !st.isCompleted } : st
              ),
              updatedAt: new Date().toISOString(),
            };
          }),
        })),

      addSubtask: (taskId, title) =>
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id !== taskId) return task;
            const newSubtask = {
              id: `st-${Date.now()}`,
              title,
              isCompleted: false,
            };
            return {
              ...task,
              subtasks: [...task.subtasks, newSubtask],
              updatedAt: new Date().toISOString(),
            };
          }),
        })),

      deleteSubtask: (taskId, subtaskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id !== taskId) return task;
            return {
              ...task,
              subtasks: task.subtasks.filter((st) => st.id !== subtaskId),
              updatedAt: new Date().toISOString(),
            };
          }),
        })),

      openNewTaskModal: (defaultColumnId = 'col-todo') =>
        set({ isNewTaskModalOpen: true, newTaskDefaultColumnId: defaultColumnId }),

      closeNewTaskModal: () => set({ isNewTaskModalOpen: false }),

      selectTask: (taskId) => set({ selectedTaskId: taskId }),

      resetToMockData: () =>
        set({
          columns: MOCK_COLUMNS,
          tasks: MOCK_TASKS,
          users: MOCK_USERS,
          tags: MOCK_TAGS,
          sprint: MOCK_SPRINT,
          filters: initialFilters,
          selectedTaskId: null,
          isNewTaskModalOpen: false,
        }),
    }),
    {
      name: 'devflow-kanban-storage',
      partialize: (state) => ({
        tasks: state.tasks,
        columns: state.columns,
      }),
    }
  )
);
