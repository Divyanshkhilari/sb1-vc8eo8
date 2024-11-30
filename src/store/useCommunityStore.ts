import { create } from 'zustand';
import { Post } from '../types/community';

interface CommunityStore {
  posts: Post[];
  addPost: (post: Omit<Post, 'id' | 'likes' | 'comments' | 'createdAt'>) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, userId: string, content: string) => void;
}

export const useCommunityStore = create<CommunityStore>((set) => ({
  posts: [],
  addPost: (postData) => {
    const post: Post = {
      ...postData,
      id: crypto.randomUUID(),
      likes: 0,
      comments: [],
      createdAt: new Date(),
    };
    set((state) => ({ posts: [post, ...state.posts] }));
  },
  likePost: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      ),
    })),
  addComment: (postId, userId, content) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: crypto.randomUUID(),
                  userId,
                  content,
                  createdAt: new Date(),
                },
              ],
            }
          : post
      ),
    })),
}));