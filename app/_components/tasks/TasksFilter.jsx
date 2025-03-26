"use client";

import { useTasks } from "@/app/_contexts/TaskContent";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function TasksFilter() {
  const { filters, setFilters } = useTasks();

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
    <section className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="relative flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
          <select
            value={filters.month}
            onChange={(e) => setFilters({ ...filters, month: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            <option value="">All Months</option>
            {months.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="h-4 w-4 absolute right-3 top-9 text-gray-400 pointer-events-none" />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.checked })}
              className="h-4 w-4 text-red-600 rounded focus:ring-red-500"
            />
            <span className="text-sm text-gray-700 flex items-center">Priority Only</span>
          </label>

          <div className="relative">
            <select
              value={filters.completed}
              onChange={(e) => setFilters({ ...filters, completed: e.target.value })}
              className="pl-2 pr-8 py-1 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
            <ChevronDownIcon className="h-3 w-3 absolute right-2 top-2 text-gray-400 pointer-events-none" />
          </div>

          <button
            onClick={() =>
              setFilters({
                date: "",
                month: "",
                priority: false,
                completed: "all",
              })
            }
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
