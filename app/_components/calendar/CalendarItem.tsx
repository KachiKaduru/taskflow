"use client";

import { useCalendar } from "@/app/_contexts/CalendarContext";
import Calendar, { type CalendarProps, type OnArgs } from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarItem() {
  const { view, date, setDate, setView } = useCalendar();

  const handleActiveStartDateChange: CalendarProps["onActiveStartDateChange"] = ({
    activeStartDate,
  }: OnArgs) => {
    if (view === "month") {
      setDate(activeStartDate ?? new Date());
    }
  };

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    const nextDate = Array.isArray(value) ? value[0] : value;
    if (nextDate instanceof Date) {
      setDate(nextDate);
    }
  };

  return (
    <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="border-none w-full"
        view={view === "month" ? "month" : "month"}
        onActiveStartDateChange={handleActiveStartDateChange}
        onClickDay={(value: Date) => {
          setDate(value);
          setView("day");
        }}
        tileClassName={({ date: tileDate, view: calendarView }) => {
          let classes = "hover:bg-gray-50 rounded-lg";
          if (tileDate.toDateString() === new Date().toDateString()) {
            classes += " bg-blue-50 text-blue-600 font-medium";
          }
          if (calendarView === "month" && tileDate.getMonth() !== date.getMonth()) {
            classes += " text-gray-400";
          }
          return classes;
        }}
        // tileContent={({ date: tileDate, view }) =>
        //   view === "month" && (
        //     <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1">
        //       {[1, 2, 3].map((dot) => (
        //         <div key={dot} className="h-1 w-1 rounded-full bg-blue-400 opacity-70" />
        //       ))}
        //     </div>
        //   )
        // }
      />
    </div>
  );
}
