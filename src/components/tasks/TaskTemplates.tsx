import React from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { defaultTemplates } from '../../types/taskTemplate';
import { motion } from 'framer-motion';

export const TaskTemplates: React.FC = () => {
  const addTask = useTaskStore((state) => state.addTask);

  const handleTemplateSelect = (templateId: string) => {
    const template = defaultTemplates.find((t) => t.id === templateId);
    if (!template) return;

    addTask({
      title: template.name,
      description: template.description + (template.steps ? '\n\nSteps:\n' + template.steps.join('\n') : ''),
      priority: template.priority,
      completed: false,
      category: template.category,
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      {defaultTemplates.map((template, index) => (
        <motion.button
          key={template.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => handleTemplateSelect(template.id)}
          className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
        >
          <span className="text-2xl">{template.icon}</span>
          <div>
            <h3 className="font-semibold">{template.name}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>
          </div>
        </motion.button>
      ))}
    </div>
  );
};