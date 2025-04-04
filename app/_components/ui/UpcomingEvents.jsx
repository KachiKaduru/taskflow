"use client";
import { useAppointments } from "@/app/_contexts/AppointmentContext";
import { useEvents } from "@/app/_contexts/EventContext";
import { CalendarIcon, VideoCameraIcon, UserIcon } from "@heroicons/react/24/outline";

export default function UpcomingEvents() {
  const { events } = useEvents();
  const { appointments } = useAppointments();

  const upcomingItems = [
    ...events.map((e) => ({ ...e, type: "event" })),
    ...appointments.map((a) => ({ ...a, type: "appointment" })),
  ]
    .filter((item) => new Date(item.startTime || item.date) > new Date())
    .sort((a, b) => new Date(a.startTime || a.date) - new Date(b.startTime || b.date))
    .slice(0, 5); // Top 5 soonest

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-indigo-500" />
          Upcoming Events
        </h2>
      </div>

      <div className="divide-y divide-gray-100">
        {upcomingItems.length > 0 ? (
          upcomingItems.map((item) => (
            <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <div
                  className={`mt-1 flex-shrink-0 p-2 rounded-full ${
                    item.type === "event"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-teal-100 text-teal-600"
                  }`}
                >
                  {item.type === "event" ? (
                    <VideoCameraIcon className="h-4 w-4" />
                  ) : (
                    <UserIcon className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{item.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(item.startTime || item.date).toLocaleString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  {item.type === "appointment" && (
                    <p className="text-xs text-gray-400 mt-1 truncate">With: {item.withPerson}</p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-400">
            <p>No upcoming events scheduled</p>
          </div>
        )}
      </div>

      {upcomingItems.length > 0 && (
        <div className="p-4 text-center border-t border-gray-100">
          <button className="text-sm text-indigo-600 hover:text-indigo-800">
            View All Events →
          </button>
        </div>
      )}
    </div>
  );
}
