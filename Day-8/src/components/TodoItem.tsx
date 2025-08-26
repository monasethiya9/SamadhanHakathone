import React from 'react';
import { Check, X, Circle } from 'lucide-react';
import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const handleToggleClick = () => {
    onToggle(todo.id);
  };

  const handleDeleteClick = () => {
    onDelete(todo.id);
  };

  return (
    <div className="group flex items-center gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100">
      <button
        onClick={handleToggleClick}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          todo.completed
            ? 'bg-emerald-500 border-emerald-500 text-white'
            : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'
        }`}
      >
        {todo.completed ? <Check size={14} /> : <Circle size={14} className="opacity-0" />}
      </button>

      <span
        className={`flex-1 transition-all duration-200 ${
          todo.completed
            ? 'text-gray-500 line-through'
            : 'text-gray-800'
        }`}
      >
        {todo.text}
      </span>

      <button
        onClick={handleDeleteClick}
        className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 rounded-lg hover:bg-red-50"
      >
        <X size={16} />
      </button>
    </div>
  );
};