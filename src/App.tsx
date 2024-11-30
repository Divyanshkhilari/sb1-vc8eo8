import React, { useState } from 'react';
import { AddTaskForm } from './components/AddTaskForm';
import { TaskList } from './components/TaskList';
import { CommunityFeed } from './components/community/CommunityFeed';
import { UserProfile } from './components/profile/UserProfile';
import { JournalView } from './components/journal/JournalView';
import { TimerDisplay } from './components/timer/TimerDisplay';
import { QuickAddTask } from './components/tasks/QuickAddTask';
import { BrainCircuit, ListTodo, Users, Book } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'tasks' | 'journal' | 'community'>('tasks');

  const renderContent = () => {
    switch (activeTab) {
      case 'tasks':
        return (
          <>
            <AddTaskForm />
            <TaskList />
          </>
        );
      case 'journal':
        return <JournalView />;
      case 'community':
        return <CommunityFeed />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BrainCircuit className="text-purple-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">AI Task Assistant</h1>
            </div>
            <nav className="flex space-x-4">
              <button
                onClick={() => setActiveTab('tasks')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'tasks'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ListTodo size={20} />
                Tasks
              </button>
              <button
                onClick={() => setActiveTab('journal')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'journal'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Book size={20} />
                Journal
              </button>
              <button
                onClick={() => setActiveTab('community')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'community'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Users size={20} />
                Community
              </button>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {renderContent()}
          </div>
          <div>
            <UserProfile />
          </div>
        </div>
      </main>

      <TimerDisplay />
      <QuickAddTask />
    </div>
  );
}

export default App;