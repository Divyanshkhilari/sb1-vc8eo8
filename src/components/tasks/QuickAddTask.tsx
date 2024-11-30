import React, { useState } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { Plus, Mic, X } from 'lucide-react';
import { useVoiceInput } from '../../hooks/useVoiceInput';
import { motion, AnimatePresence } from 'framer-motion';

export const QuickAddTask: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const addTask = useTaskStore((state) => state.addTask);
  const {
    isListening,
    transcript,
    error,
    startListening,
    stopListening,
    clearTranscript,
  } = useVoiceInput();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: '',
      priority: 'medium',
      completed: false,
      category: 'default',
    });

    setTitle('');
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (transcript) {
      setTitle(transcript);
      clearTranscript();
    }
  }, [transcript, clearTranscript]);

  return (
    <div className="fixed bottom-4 left-4">
      <AnimatePresence>
        {isOpen ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onSubmit={handleSubmit}
            className="flex items-center gap-2 bg-white rounded-lg shadow-lg p-3"
          >
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Quick add task..."
              className="px-3 py-1 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              autoFocus
            />
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`p-2 rounded-full transition-colors ${
                isListening
                  ? 'bg-red-100 text-red-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Mic size={20} />
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
            >
              <Plus size={20} />
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </motion.form>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-lg"
          >
            <Plus size={20} />
            Quick Add
          </motion.button>
        )}
      </AnimatePresence>
      {error && (
        <p className="text-sm text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
};