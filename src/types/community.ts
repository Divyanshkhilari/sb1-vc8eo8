import { User } from './user';

export interface Post {
  id: string;
  userId: string;
  content: string;
  likes: number;
  comments: Comment[];
  createdAt: Date;
  taskId?: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}