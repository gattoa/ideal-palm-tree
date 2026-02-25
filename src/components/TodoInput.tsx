"use client";

import { useState, FormEvent } from "react";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-b border-gray-100">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
        aria-label="New todo"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Add
      </button>
    </form>
  );
}
