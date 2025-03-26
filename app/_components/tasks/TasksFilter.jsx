"use client";

import { useTasks } from "@/app/_contexts/TaskContent";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function TasksFilter() {
  const { filters, setFilters, resetFilters } = useTasks();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <section className="bg-white py-3 px-4 border-b border-gray-200 sticky top-0 z-10">
      <h2>Filters</h2>

      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {/* Date Filter - Shows blue text when active */}
        <div className="flex-shrink-0">
          <label
            className={`block text-xs font-medium mb-1 ${
              filters.date ? "text-blue-600" : "text-gray-500"
            }`}
          >
            Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className={`p-1.5 text-sm border rounded-lg focus:ring-1 focus:ring-blue-500 ${
                filters.date ? "border-blue-300" : "border-gray-300"
              }`}
            />
            {filters.date && (
              <button
                onClick={() => setFilters({ ...filters, date: "" })}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>

        {/* Month Filter - Shows blue text when active */}
        <div className="flex-shrink-0">
          <label
            className={`block text-xs font-medium mb-1 ${
              filters.month ? "text-blue-600" : "text-gray-500"
            }`}
          >
            Month
          </label>
          <div className="relative">
            <select
              value={filters.month}
              onChange={(e) => setFilters({ ...filters, month: e.target.value })}
              className={`pl-2 pr-6 py-1.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none ${
                filters.month ? "border-blue-300" : "border-gray-300"
              }`}
            >
              <option value="">All</option>
              {months.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="h-3 w-3 absolute right-2 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Priority Filter - Shows red when active */}
        <div className="flex-shrink-0 flex items-end gap-2 h-full pt-5">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.checked })}
              className={`h-3.5 w-3.5 rounded focus:ring-red-500 ${
                filters.priority ? "text-red-600" : "text-gray-400"
              }`}
            />
            <span
              className={`text-xs ${
                filters.priority ? "text-red-600 font-medium" : "text-gray-500"
              }`}
            >
              Priority
            </span>
          </label>
        </div>

        {/* Status Filter - Shows blue when not "all" */}
        <div className="flex-shrink-0">
          <div className="relative">
            <select
              value={filters.completed}
              onChange={(e) => setFilters({ ...filters, completed: e.target.value })}
              className={`pl-2 pr-6 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none ${
                filters.completed !== "all"
                  ? "border-blue-300 text-blue-600"
                  : "border-gray-300 text-gray-500"
              }`}
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
            <ChevronDownIcon className="h-2.5 w-2.5 absolute right-2 top-2.5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Reset Button - Only visible when any filter is active */}
        {(filters.date || filters.month || filters.priority || filters.completed !== "all") && (
          <button
            onClick={resetFilters}
            className="flex-shrink-0 text-xs text-blue-600 hover:text-blue-800 whitespace-nowrap ml-2"
          >
            Clear Filters
          </button>
        )}
      </div>
    </section>
  );
}
