import React, { useState } from 'react';
import { useJournalStore } from '../../store/useJournalStore';
import { CreateJournalEntry } from './CreateJournalEntry';
import { JournalEntry } from './JournalEntry';
import { format } from 'date-fns';

export const JournalView: React.FC = () => {
  const entries = useJournalStore((state) => state.entries);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const todayEntries = entries.filter(
    (entry) => entry.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Journal</h2>
        <input
          type="date"
          value={format(selectedDate, 'yyyy-MM-dd')}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      <CreateJournalEntry />
      <div className="space-y-4">
        {todayEntries.map((entry) => (
          <JournalEntry key={entry.id} entryId={entry.id} />
        ))}
      </div>
    </div>
  );
};