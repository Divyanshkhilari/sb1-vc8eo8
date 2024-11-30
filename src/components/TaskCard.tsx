import React from 'react';
import { format } from 'date-fns';
import { Task } from '../types/task';
import { useTaskStore } from '../store/useTaskStore';
import { Trash2, Edit, Clock, CheckCircle } from 'lucide-react';
import { TimerControls } from './timer/TimerControls';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { deleteTask, toggleComplete } = useTaskStore();

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => toggleComplete(task.id)}
            className="text-gray-600 hover:text-green-600"
          >
            <CheckCircle
              className={task.completed ? 'text-green-600' : ''}
              size={20}
            />
          </button>
          <button className="text-gray-600 hover:text-blue-600">
            <Edit size={20} />
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-gray-600 hover:text-red-600"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
      <h3
        className={`text-lg font-semibold mb-2 ${
          task.completed ? 'line-through text-gray-500' : ''
        }`}
      >
        {task.title}
      </h3>
      <p className="text-gray-600 mb-4">{task.description}</p>
      {task.deadline && (
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock size={16} className="mr-1" />
          <span>Due: {format(task.deadline, 'PPP')}</span>
        </div>
      )}
      <TimerControls taskId={task.id} />
    </div>
  );
};