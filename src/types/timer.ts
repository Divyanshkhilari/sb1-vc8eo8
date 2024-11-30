export interface Timer {
  id: string;
  taskId?: string;
  duration: number; // in seconds
  elapsed: number; // in seconds
  isRunning: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimerStats {
  totalTime: number; // in seconds
  sessionsCompleted: number;
}