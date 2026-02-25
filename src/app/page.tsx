"use client";

import { useState } from "react";
import { TodoInput } from "@/components/TodoInput";
import { TodoItem } from "@/components/TodoItem";
import { TodoFilters } from "@/components/TodoFilters";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export type FilterType = "all" | "active" | "completed";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <main className="min-h-screen flex items-start justify-center pt-12 sm:pt-20 px-4">
      <div className="w-full max-w-lg">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            To Do List
          </h1>
          <p className="text-gray-500 mt-2">Stay organized, get things done</p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg shadow-indigo-100/50 border border-gray-100 overflow-hidden">
          <TodoInput onAdd={addTodo} />

          {todos.length > 0 && (
            <>
              <TodoFilters
                filter={filter}
                onFilterChange={setFilter}
                activeCount={activeCount}
                completedCount={completedCount}
                onClearCompleted={clearCompleted}
              />

              <ul className="divide-y divide-gray-50">
                {filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))}
              </ul>

              {filteredTodos.length === 0 && (
                <p className="text-center text-gray-400 py-8 text-sm">
                  No {filter} items
                </p>
              )}
            </>
          )}

          {todos.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <svg
                className="w-16 h-16 mx-auto mb-4 opacity-30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-sm">Add your first task above</p>
            </div>
          )}
        </div>

        <footer className="text-center mt-6 text-xs text-gray-400">
          {todos.length > 0 && (
            <span>
              {activeCount} item{activeCount !== 1 ? "s" : ""} remaining
            </span>
          )}
        </footer>
      </div>
    </main>
  );
}
