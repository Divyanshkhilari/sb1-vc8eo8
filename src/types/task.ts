export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  deadline?: Date;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  reminder?: Date;
}