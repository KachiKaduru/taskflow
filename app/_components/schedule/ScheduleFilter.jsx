"use client";

import { useCalendar } from "@/app/_contexts/CalendarContext";
import { XMarkIcon } from "@heroicons/react/24/outline";

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

const types = [
  { value: "all", label: "All Items" },
  { value: "task", label: "Tasks" },
  { value: "event", label: "Events" },
  { value: "appointment", label: "Appointments" },
];

export default function ScheduleFilter() {
  const { filters, setFilters, resetFilters } = useCalendar();

  return (
    <section className="bg-white py-3 px-4 border-b border-gray-200 z-10">
      <h2 className="text-sm font-medium text-gray-700 mb-4">Filters</h2>

      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {/* Date Filter */}
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
              value={filters.date || ""}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className={`p-1.5 text-sm border rounded-lg ${
                filters.date ? "border-blue-300" : "border-gray-300"
              }`}
            />
            {filters.date && (
              <button
                onClick={() => setFilters({ ...filters, date: "" })}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>

        {/* Month Filter */}
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
              value={filters.month || ""}
              onChange={(e) => setFilters({ ...filters, month: e.target.value })}
              className={`pl-2 pr-6 py-1.5 text-sm border rounded-lg ${
                filters.month ? "border-blue-300" : "border-gray-300"
              }`}
            >
              <option value="">All Months</option>
              {months.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Item Type Filter */}
        <div className="flex-shrink-0">
          <label className="block text-xs font-medium mb-1 text-gray-500">Type</label>
          <div className="relative">
            <select
              value={filters.type || "all"}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              className="pl-2 pr-6 py-1.5 text-xs border border-gray-300 rounded-lg"
            >
              {types.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter (Tasks only) */}
        {(!filters.type || filters.type === "all" || filters.type === "task") && (
          <div className="flex-shrink-0">
            <label className="block text-xs font-medium mb-1 text-gray-500">Status</label>

            <div className="relative">
              <select
                value={filters.status || "all"}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className={`pl-2 pr-6 py-1.5 text-xs border rounded-lg ${
                  filters.status !== "all"
                    ? "border-blue-300 text-blue-600"
                    : "border-gray-300 text-gray-500"
                }`}
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </div>
          </div>
        )}

        {/* Priority Filter (Tasks only) */}
        {(!filters.type || filters.type === "all" || filters.type === "task") && (
          <div className="flex-shrink-0 flex items-end gap-2 h-full pt-5">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.priority || false}
                onChange={(e) => setFilters({ ...filters, priority: e.target.checked })}
                className={`h-3.5 w-3.5 rounded ${
                  filters.priority ? "text-red-600" : "text-gray-400"
                }`}
              />
              <span className={`text-xs ${filters.priority ? "text-red-600" : "text-gray-500"}`}>
                Priority
              </span>
            </label>
          </div>
        )}

        {/* Reset Button */}
        {(filters.date ||
          filters.month ||
          filters.type !== "all" ||
          filters.priority ||
          filters.status !== "all") && (
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
