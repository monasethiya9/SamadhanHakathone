import React from 'react';
import { FilterType } from '../types/Todo';

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  todoCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  currentFilter,
  onFilterChange,
  todoCounts,
}) => {
  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  const handleFilterClick = (filter: FilterType) => {
    onFilterChange(filter);
  };

  return (
    <div className="flex justify-center mb-6">
      <div className="flex gap-1 p-1 bg-white/40 backdrop-blur-sm rounded-xl border border-gray-200">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => handleFilterClick(filter.key)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              currentFilter === filter.key
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
            }`}
          >
            {filter.label} ({todoCounts[filter.key]})
          </button>
        ))}
      </div>
    </div>
  );
};