"use client";

import { useCalendar } from "@/app/_contexts/CalendarContext";

export default function CalendarFilter() {
  const { view, setView, filters, setFilters } = useCalendar();

  const viewFilters = ["day", "week", "month"];
  const typeFilters = [
    { value: "all", label: "All" },
    { value: "task", label: "Tasks" },
    { value: "event", label: "Events" },
    { value: "appointment", label: "Meetings" },
  ];

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex gap-2 bg-gray-50 p-1 rounded-lg">
        {viewFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setView(filter)}
            className={`px-3 py-1 rounded-md capitalize text-sm ${
              view === filter ? "bg-white shadow-sm text-blue-600" : "text-gray-600"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex gap-2 items-center">
        <span className="text-sm text-gray-500">Show:</span>
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="text-sm border rounded-md px-3 py-1"
        >
          {typeFilters.map((filter) => (
            <option key={filter.value} value={filter.value}>
              {filter.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
