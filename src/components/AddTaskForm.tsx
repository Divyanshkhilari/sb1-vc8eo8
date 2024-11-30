import React, { useState } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { Plus } from 'lucide-react';
import { TaskTemplates } from './tasks/TaskTemplates';
import { useVoiceInput } from '../hooks/useVoiceInput';
import { motion } from 'framer-motion';

export const AddTaskForm: React.FC = () => {
  const addTask = useTaskStore((state) => state.addTask);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [showTemplates, setShowTemplates] = useState(false);
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    clearTranscript,
  } = useVoiceInput();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title,
      description,
      priority,
      completed: false,
      category: 'default',
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  React.useEffect(() => {
    if (transcript) {
      setTitle(transcript);
      clearTranscript();
    }
  }, [transcript, clearTranscript]);

  return (
    <div className="space-y-6">
      <motion.button
        onClick={() => setShowTemplates(!showTemplates)}
        className="w-full px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors text-left"
      >
        📝 Use a template to create your task
      </motion.button>

      {showTemplates && <TaskTemplates />}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`p-2 rounded-lg transition-colors ${
                isListening
                  ? 'bg-red-100 text-red-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🎤
            </button>
          </div>
        </div>
        <div className="mb-4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={3}
          />
        </div>
        <div className="flex items-center justify-between">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <Plus size={20} />
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};