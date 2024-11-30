export interface JournalEntry {
  id: string;
  userId: string;
  content: string;
  mood: 'great' | 'good' | 'neutral' | 'bad' | 'terrible';
  date: Date;
  taskIds: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface JournalPrompt {
  id: string;
  question: string;
  category: 'reflection' | 'goals' | 'gratitude' | 'challenges';
}