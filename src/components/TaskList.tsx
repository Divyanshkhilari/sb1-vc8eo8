import React from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { TaskCard } from './TaskCard';

export const TaskList: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};