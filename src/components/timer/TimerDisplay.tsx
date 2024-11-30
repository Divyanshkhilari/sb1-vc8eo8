import React, { useEffect, useCallback } from 'react';
import { useTimerStore } from '../../store/useTimerStore';
import { Play, Pause, Square, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export const TimerDisplay: React.FC = () => {
  const { activeTimer, timerStats, pauseTimer, resumeTimer, stopTimer, resetTimer, updateElapsed } =
    useTimerStore();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const updateTimer = useCallback(() => {
    if (activeTimer?.isRunning) {
      const newElapsed = activeTimer.elapsed + 1;
      if (newElapsed >= activeTimer.duration) {
        stopTimer();
      } else {
        updateElapsed(newElapsed);
      }
    }
  }, [activeTimer, stopTimer, updateElapsed]);

  useEffect(() => {
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [updateTimer]);

  if (!activeTimer) return null;

  const progress = (activeTimer.elapsed / activeTimer.duration) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-6 w-64"
    >
      <div className="relative mb-4">
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-purple-600 rounded-full"
          />
        </div>
      </div>
      
      <div className="text-center mb-4">
        <span className="text-3xl font-bold font-mono">
          {formatTime(activeTimer.duration - activeTimer.elapsed)}
        </span>
      </div>

      <div className="flex justify-center space-x-4">
        {activeTimer.isRunning ? (
          <button
            onClick={() => pauseTimer()}
            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full transition-colors"
          >
            <Pause size={24} />
          </button>
        ) : (
          <button
            onClick={() => resumeTimer()}
            className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
          >
            <Play size={24} />
          </button>
        )}
        <button
          onClick={() => stopTimer()}
          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
        >
          <Square size={24} />
        </button>
        <button
          onClick={() => resetTimer()}
          className="p-2 text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
        >
          <RotateCcw size={24} />
        </button>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        Sessions: {timerStats.sessionsCompleted} | Total:{' '}
        {formatTime(timerStats.totalTime)}
      </div>
    </motion.div>
  );
};