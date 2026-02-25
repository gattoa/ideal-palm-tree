"use client";

import type { FilterType } from "@/app/page";

interface TodoFiltersProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

const filters: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "completed", label: "Done" },
];

export function TodoFilters({
  filter,
  onFilterChange,
  completedCount,
  onClearCompleted,
}: TodoFiltersProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-50/60 border-b border-gray-100">
      <div className="flex gap-1">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              filter === key
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-500 hover:bg-gray-200/60"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-xs text-gray-400 hover:text-red-500 transition-colors"
        >
          Clear done
        </button>
      )}
    </div>
  );
}
