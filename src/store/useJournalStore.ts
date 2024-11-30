import { create } from 'zustand';
import { JournalEntry, JournalPrompt } from '../types/journal';

interface JournalStore {
  entries: JournalEntry[];
  prompts: JournalPrompt[];
  addEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateEntry: (id: string, entry: Partial<JournalEntry>) => void;
  deleteEntry: (id: string) => void;
  getEntriesByDate: (date: Date) => JournalEntry[];
  getRandomPrompt: () => JournalPrompt;
}

const defaultPrompts: JournalPrompt[] = [
  {
    id: '1',
    question: 'What was your biggest achievement today?',
    category: 'reflection',
  },
  {
    id: '2',
    question: 'What challenges did you overcome?',
    category: 'challenges',
  },
  {
    id: '3',
    question: 'What are you grateful for today?',
    category: 'gratitude',
  },
  {
    id: '4',
    question: 'What are your main goals for tomorrow?',
    category: 'goals',
  },
];

export const useJournalStore = create<JournalStore>((set, get) => ({
  entries: [],
  prompts: defaultPrompts,
  addEntry: (entryData) => {
    const entry: JournalEntry = {
      ...entryData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({ entries: [...state.entries, entry] }));
  },
  updateEntry: (id, updatedEntry) =>
    set((state) => ({
      entries: state.entries.map((entry) =>
        entry.id === id
          ? { ...entry, ...updatedEntry, updatedAt: new Date() }
          : entry
      ),
    })),
  deleteEntry: (id) =>
    set((state) => ({
      entries: state.entries.filter((entry) => entry.id !== id),
    })),
  getEntriesByDate: (date) => {
    const entries = get().entries;
    return entries.filter(
      (entry) =>
        entry.date.toDateString() === date.toDateString()
    );
  },
  getRandomPrompt: () => {
    const prompts = get().prompts;
    return prompts[Math.floor(Math.random() * prompts.length)];
  },
}));