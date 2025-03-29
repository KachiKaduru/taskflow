"use client";

import { useCalendar } from "@/app/_contexts/CalendarContext";

export default function CalendarFilter() {
  const { view, setView } = useCalendar();

  const filter = ["day", "week", "month"];

  return (
    <div className="flex gap-2">
      {filter.map((filter, i) => (
        <button
          key={i + 1}
          onClick={() => setView(filter)}
          className={`px-3 py-1 rounded-lg capitalize ${
            view === filter ? "bg-blue-100 text-blue-600" : "text-gray-600"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
