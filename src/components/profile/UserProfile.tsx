import React from 'react';
import { useUserStore } from '../../store/useUserStore';
import { Trophy, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const UserProfile: React.FC = () => {
  const user = useUserStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <div className="flex items-center space-x-2 text-gray-600">
            <Trophy size={16} />
            <span>Level {user.level}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="relative pt-1">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block text-purple-600">
                Progress to Next Level
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-purple-600">
                {user.points % 100}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${user.points % 100}%` }}
              transition={{ duration: 1 }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Award size={20} />
          Badges
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {user.badges.map((badge) => (
            <div
              key={badge.id}
              className="flex items-center p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-purple-600">{badge.icon}</span>
              <div className="ml-3">
                <h4 className="font-medium">{badge.name}</h4>
                <p className="text-sm text-gray-500">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};