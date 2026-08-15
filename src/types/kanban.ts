export type TaskType = 'feature' | 'bug' | 'task' | 'refactor' | 'docs';

export type Priority = 'urgent' | 'high' | 'medium' | 'low';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface Task {
  id: string;
  code: string;
  title: string;
  description?: string;
  type: TaskType;
  priority: Priority;
  storyPoints: number;
  columnId: string;
  position: number;
  assignee?: User;
  subtasks: Subtask[];
  tags: Tag[];
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  title: string;
  slug: string;
  color: string;
  position: number;
  wipLimit?: number;
}

export interface Sprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  totalStoryPoints: number;
  targetStoryPoints: number;
}

export interface FilterState {
  search: string;
  priority: Priority | 'all';
  type: TaskType | 'all';
  assigneeId: string | 'all';
  tagId: string | 'all';
}

export type ViewMode = 'board' | 'list' | 'analytics';
