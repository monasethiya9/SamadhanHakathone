import React from 'react';
import { CheckCircle, Clock, Trash2 } from 'lucide-react';

interface TodoStatsProps {
  totalTodos: number;
  completedTodos: number;
  onClearCompleted: () => void;
}

export const TodoStats: React.FC<TodoStatsProps> = ({
  totalTodos,
  completedTodos,
  onClearCompleted,
}) => {
  const activeTodos = totalTodos - completedTodos;

  const handleClearCompletedClick = () => {
    onClearCompleted();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-gray-200">
      <div className="flex items-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>{activeTodos} active</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle size={16} />
          <span>{completedTodos} completed</span>
        </div>
      </div>

      {completedTodos > 0 && (
        <button
          onClick={handleClearCompletedClick}
          className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
        >
          <Trash2 size={14} />
          Clear completed
        </button>
      )}
    </div>
  );
};