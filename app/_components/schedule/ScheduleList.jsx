"use client";

import { useCalendar } from "@/app/_contexts/CalendarContext";
import { FunnelIcon } from "@heroicons/react/24/outline";
import TaskCard from "../tasks/TaskCard";
import EventCard from "../events/EventCard";
import AppointmentCard from "../appointments/AppointmentCard";

export default function ScheduleList() {
  const { getScheduleItems } = useCalendar();
  const items = getScheduleItems();

  return (
    <section className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      {items.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {items.map((item) => {
            switch (item.type) {
              case "task":
                return <TaskCard key={item.id} task={item} />;
              case "event":
                return <EventCard key={item.id} event={item} />;
              case "appointment":
                return <AppointmentCard key={item.id} appointment={item} />;
              default:
                return null;
            }
          })}
        </div>
      ) : (
        <div className="p-8 text-center text-gray-400">
          <FunnelIcon className="h-12 w-12 mx-auto mb-2" />
          <p>No items match your filters</p>
        </div>
      )}
    </section>
  );
}
