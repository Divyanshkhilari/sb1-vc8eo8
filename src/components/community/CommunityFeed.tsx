import React from 'react';
import { useCommunityStore } from '../../store/useCommunityStore';
import { Post } from './Post';
import { CreatePost } from './CreatePost';
import { motion } from 'framer-motion';

export const CommunityFeed: React.FC = () => {
  const posts = useCommunityStore((state) => state.posts);

  return (
    <div className="space-y-6">
      <CreatePost />
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Post post={post} />
        </motion.div>
      ))}
    </div>
  );
};