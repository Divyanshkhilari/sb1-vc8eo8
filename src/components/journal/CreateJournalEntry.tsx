import React, { useState } from 'react';
import { useJournalStore } from '../../store/useJournalStore';
import { useUserStore } from '../../store/useUserStore';
import { Sparkles } from 'lucide-react';

export const CreateJournalEntry: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const { addEntry, getRandomPrompt } = useJournalStore();
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<'great' | 'good' | 'neutral' | 'bad' | 'terrible'>('neutral');
  const [tags, setTags] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !content.trim()) return;

    addEntry({
      userId: user.id,
      content: content.trim(),
      mood,
      date: new Date(),
      taskIds: [],
      tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean),
    });

    setContent('');
    setMood('neutral');
    setTags('');
  };

  const handleGetPrompt = () => {
    const prompt = getRandomPrompt();
    setContent((prev) => `${prev ? prev + '\n\n' : ''}${prompt.question}\n`);
    setShowPrompt(true);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">New Journal Entry</h3>
        <button
          type="button"
          onClick={handleGetPrompt}
          className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
        >
          <Sparkles size={20} />
          Get Prompt
        </button>
      </div>
      <div className="mb-4">
        <div className="flex justify-center space-x-4 mb-4">
          {(['terrible', 'bad', 'neutral', 'good', 'great'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMood(m)}
              className={`text-2xl p-2 rounded-full transition-transform ${
                mood === m ? 'transform scale-125' : ''
              }`}
            >
              {m === 'great' && '😄'}
              {m === 'good' && '🙂'}
              {m === 'neutral' && '😐'}
              {m === 'bad' && '😕'}
              {m === 'terrible' && '😢'}
            </button>
          ))}
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts..."
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows={6}
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Add tags (comma-separated)"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          disabled={!content.trim()}
        >
          Save Entry
        </button>
      </div>
    </form>
  );
};