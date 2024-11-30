import { create } from 'zustand';
import { Timer, TimerStats } from '../types/timer';

interface TimerStore {
  activeTimer: Timer | null;
  timerStats: TimerStats;
  startTimer: (duration: number, taskId?: string) => void;
  stopTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  updateElapsed: (elapsed: number) => void;
  resetTimer: () => void;
}

export const useTimerStore = create<TimerStore>((set) => ({
  activeTimer: null,
  timerStats: {
    totalTime: 0,
    sessionsCompleted: 0,
  },
  startTimer: (duration, taskId) =>
    set({
      activeTimer: {
        id: crypto.randomUUID(),
        taskId,
        duration,
        elapsed: 0,
        isRunning: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  stopTimer: () =>
    set((state) => ({
      activeTimer: null,
      timerStats: {
        totalTime: state.timerStats.totalTime + (state.activeTimer?.elapsed || 0),
        sessionsCompleted: state.timerStats.sessionsCompleted + 1,
      },
    })),
  pauseTimer: () =>
    set((state) =>
      state.activeTimer
        ? {
            activeTimer: { ...state.activeTimer, isRunning: false },
          }
        : state
    ),
  resumeTimer: () =>
    set((state) =>
      state.activeTimer
        ? {
            activeTimer: { ...state.activeTimer, isRunning: true },
          }
        : state
    ),
  updateElapsed: (elapsed) =>
    set((state) =>
      state.activeTimer
        ? {
            activeTimer: { ...state.activeTimer, elapsed },
          }
        : state
    ),
  resetTimer: () => set({ activeTimer: null }),
}));