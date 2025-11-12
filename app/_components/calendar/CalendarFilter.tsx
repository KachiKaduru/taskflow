"use client";

import { useCalendar } from "@/app/_contexts/CalendarContext";
import type { CalendarView } from "@/app/_types";

const viewFilters: CalendarView[] = ["day", "week", "month"];

export default function CalendarFilter() {
  const { view, setView } = useCalendar();

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
    </div>
  );
}
