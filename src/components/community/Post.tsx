import React, { useState } from 'react';
import { format } from 'date-fns';
import { Heart, MessageCircle } from 'lucide-react';
import { Post as PostType } from '../../types/community';
import { useCommunityStore } from '../../store/useCommunityStore';
import { useUserStore } from '../../store/useUserStore';

interface PostProps {
  post: PostType;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const { likePost, addComment } = useCommunityStore();
  const user = useUserStore((state) => state.user);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && newComment.trim()) {
      addComment(post.id, user.id, newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start space-x-4">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop"
          alt="User avatar"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Demo User</h3>
            <span className="text-sm text-gray-500">
              {format(post.createdAt, 'PPp')}
            </span>
          </div>
          <p className="mt-2 text-gray-700">{post.content}</p>
          <div className="mt-4 flex items-center space-x-4">
            <button
              onClick={() => likePost(post.id)}
              className="flex items-center space-x-1 text-gray-500 hover:text-purple-600"
            >
              <Heart size={20} />
              <span>{post.likes}</span>
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-1 text-gray-500 hover:text-purple-600"
            >
              <MessageCircle size={20} />
              <span>{post.comments.length}</span>
            </button>
          </div>
          {showComments && (
            <div className="mt-4 space-y-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=30&h=30&fit=crop"
                      alt="Commenter avatar"
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="font-medium">Demo User</span>
                    <span className="text-sm text-gray-500">
                      {format(comment.createdAt, 'PPp')}
                    </span>
                  </div>
                  <p className="mt-1 text-gray-700">{comment.content}</p>
                </div>
              ))}
              <form onSubmit={handleAddComment} className="mt-4">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};