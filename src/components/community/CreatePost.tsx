import React, { useState } from 'react';
import { useCommunityStore } from '../../store/useCommunityStore';
import { useUserStore } from '../../store/useUserStore';
import { Send } from 'lucide-react';

export const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const { addPost } = useCommunityStore();
  const user = useUserStore((state) => state.user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && content.trim()) {
      addPost({
        userId: user.id,
        content: content.trim(),
      });
      setContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your progress or thoughts..."
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        rows={3}
      />
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          disabled={!content.trim()}
        >
          <Send size={20} />
          Post
        </button>
      </div>
    </form>
  );
};