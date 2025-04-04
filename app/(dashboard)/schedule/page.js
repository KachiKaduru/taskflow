// app/schedule/page.js
"use client";

import { useCalendar } from "@/app/_contexts/CalendarContext";

// import { useCalendar } from '@/context/CalendarContext';

export default function SchedulePage() {
  const { date, view, getScheduleItems, setDate, setView } = useCalendar();
  const scheduleItems = getScheduleItems();

  return (
    <div>
      <h1>Schedule</h1>
      <div>
        <button onClick={() => setView("day")}>Day</button>
        <button onClick={() => setView("week")}>Week</button>
        <button onClick={() => setView("month")}>Month</button>
      </div>

      {scheduleItems.map((item) => (
        <div key={item.id} className={`item-${item.type}`}>
          <h3>{item.title}</h3>
          <p>{new Date(item.date || item.dueDate || item.startTime).toLocaleString()}</p>
          {item.type === "task" && <span>Task: {item.isCompleted ? "✅" : "⏳"}</span>}
          {item.type === "event" && <span>Event</span>}
          {item.type === "appointment" && <span>Appointment with {item.with}</span>}
        </div>
      ))}
    </div>
  );
}
