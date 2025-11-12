"use client";

import { useCalendar } from "@/app/_contexts/CalendarContext";
import { useScheduleMetrics } from "@/app/_hooks/useScheduleMetrics";
import { CalendarIcon } from "@heroicons/react/24/outline";
import EventCard from "../_events/EventCard";
import AppointmentCard from "../_appointments/AppointmentCard";
import TaskCard from "../_tasks/TaskCard";

export default function CalendarItemList() {
  const { date, view } = useCalendar();
  const { allItems } = useScheduleMetrics();

  const getViewTitle = () => {
    if (view === "day") return date.toLocaleDateString();
    if (view === "week") return `Week of ${date.toLocaleDateString()}`;
    return `${date.toLocaleString("default", { month: "long" })} Schedule`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-semibold flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-blue-500" />
          {getViewTitle()}
        </h2>
      </div>

      {allItems.length > 0 ? (
        <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
          {allItems.map((item) => {
            switch (item.type) {
              case "task":
                return <TaskCard key={`task-${item.id}`} task={item} />;
              case "event":
                return <EventCard key={`event-${item.id}`} event={item} />;
              case "appointment":
                return <AppointmentCard key={`appointment-${item.id}`} appointment={item} />;
              default:
                return null;
            }
          })}
        </div>
      ) : (
        <div className="p-6 text-center text-gray-400">No scheduled plan for this day yet!</div>
      )}
    </div>
  );
}
