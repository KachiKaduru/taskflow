"use client";

import { useCalendar } from "@/app/_contexts/CalendarContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarItem() {
  const { view, date, setDate } = useCalendar();

  return (
    <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <Calendar
        onChange={setDate}
        value={date}
        className="border-none w-full"
        view={view === "month" ? "month" : "month"} // Always show month view for navigation
        tileClassName={({ date: tileDate, view }) => {
          let classes = "";
          if (tileDate.toDateString() === new Date().toDateString()) {
            classes += " bg-blue-50 text-blue-600 rounded-full";
          }
          if (view === "month" && tileDate.getMonth() !== date.getMonth()) {
            classes += " text-gray-400";
          }
          return classes;
        }}
      />
    </div>
  );
}
