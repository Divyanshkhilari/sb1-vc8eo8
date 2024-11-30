import React, { useState } from 'react';
import { format } from 'date-fns';
import { useJournalStore } from '../../store/useJournalStore';
import { Pencil, Save, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface JournalEntryProps {
  entryId: string;
}

export const JournalEntry: React.FC<JournalEntryProps> = ({ entryId }) => {
  const { entries, updateEntry, deleteEntry } = useJournalStore();
  const entry = entries.find((e) => e.id === entryId);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(entry?.content || '');

  if (!entry) return null;

  const handleSave = () => {
    updateEntry(entryId, { content });
    setIsEditing(false);
  };

  const moodEmoji = {
    great: '😄',
    good: '🙂',
    neutral: '😐',
    bad: '😕',
    terrible: '😢',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 mb-4"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">{moodEmoji[entry.mood]}</span>
          <span className="text-sm text-gray-500">
            {format(entry.date, 'PPP')}
          </span>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="text-green-600 hover:text-green-700"
            >
              <Save size={20} />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-600 hover:text-blue-600"
            >
              <Pencil size={20} />
            </button>
          )}
          <button
            onClick={() => deleteEntry(entryId)}
            className="text-gray-600 hover:text-red-600"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
      {isEditing ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows={4}
        />
      ) : (
        <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
      )}
      {entry.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};