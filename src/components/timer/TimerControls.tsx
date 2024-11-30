import React, { useState } from 'react';
import { useTimerStore } from '../../store/useTimerStore';
import { Timer as TimerIcon } from 'lucide-react';

interface TimerControlsProps {
  taskId?: string;
}

export const TimerControls: React.FC<TimerControlsProps> = ({ taskId }) => {
  const { startTimer, activeTimer } = useTimerStore();
  const [duration, setDuration] = useState(25 * 60); // 25 minutes in seconds

  const handleStartTimer = () => {
    startTimer(duration, taskId);
  };

  const presetDurations = [
    { label: '25m', value: 25 * 60 },
    { label: '15m', value: 15 * 60 },
    { label: '5m', value: 5 * 60 },
  ];

  return (
    <div className="flex items-center space-x-2">
      {!activeTimer && (
        <>
          <div className="flex space-x-2">
            {presetDurations.map((preset) => (
              <button
                key={preset.value}
                onClick={() => setDuration(preset.value)}
                className={`px-3 py-1 rounded-full text-sm ${
                  duration === preset.value
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleStartTimer}
            className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <TimerIcon size={20} />
            Start Timer
          </button>
        </>
      )}
    </div>
  );
};