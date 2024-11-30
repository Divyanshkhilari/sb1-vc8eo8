import { create } from 'zustand';
import { User, Badge } from '../types/user';

interface UserStore {
  user: User | null;
  addPoints: (points: number) => void;
  addBadge: (badge: Badge) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    id: '1',
    name: 'Demo User',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    points: 0,
    level: 1,
    badges: [],
  },
  addPoints: (points) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            points: state.user.points + points,
            level: Math.floor((state.user.points + points) / 100) + 1,
          }
        : null,
    })),
  addBadge: (badge) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            badges: [...state.user.badges, badge],
          }
        : null,
    })),
}));