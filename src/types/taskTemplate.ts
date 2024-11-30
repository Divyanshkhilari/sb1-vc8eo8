export interface TaskTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  estimatedDuration?: number; // in minutes
  steps?: string[];
  icon: string;
}

export const defaultTemplates: TaskTemplate[] = [
  {
    id: 'meeting',
    name: 'Meeting',
    description: 'Schedule and prepare for a meeting',
    category: 'work',
    priority: 'medium',
    estimatedDuration: 60,
    steps: ['Prepare agenda', 'Send invites', 'Review materials'],
    icon: '🤝',
  },
  {
    id: 'project',
    name: 'Project Task',
    description: 'Track progress on a project task',
    category: 'work',
    priority: 'high',
    estimatedDuration: 120,
    steps: ['Define scope', 'Set milestones', 'Track progress'],
    icon: '📊',
  },
  {
    id: 'personal',
    name: 'Personal Goal',
    description: 'Set and track personal goals',
    category: 'personal',
    priority: 'medium',
    icon: '🎯',
  },
];