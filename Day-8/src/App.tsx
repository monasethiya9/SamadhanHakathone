import React from 'react';
import { CheckSquare } from 'lucide-react';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';
import { TodoStats } from './components/TodoStats';
import { useTodos } from './hooks/useTodos';

function App() {
  const {
    todos,
    filter,
    todoCounts,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    setFilter,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              TodoFlow
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Organize your tasks with style and efficiency
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
          <TodoInput onAddTodo={addTodo} />
          
          <TodoFilters
            currentFilter={filter}
            onFilterChange={setFilter}
            todoCounts={todoCounts}
          />

          <TodoList
            todos={todos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
          />

          <TodoStats
            totalTodos={todoCounts.all}
            completedTodos={todoCounts.completed}
            onClearCompleted={clearCompleted}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;