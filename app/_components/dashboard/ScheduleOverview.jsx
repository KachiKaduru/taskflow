"use client";
import { useTasks, useEvents, useAppointments } from "@/app/_contexts";
import {
  CalendarIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  VideoCameraIcon,
  UserIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function ScheduleOverview() {
  const { getTodaysTasks, toggleTaskCompletion } = useTasks();
  const { events } = useEvents();
  const { appointments } = useAppointments();

  const todaysItems = [
    ...getTodaysTasks().map((item) => ({ ...item, type: "task" })),
    ...events
      .filter((e) => new Date(e.startTime).toDateString() === new Date().toDateString())
      .map((item) => ({ ...item, type: "event" })),
    ...appointments
      .filter((a) => new Date(a.date).toDateString() === new Date().toDateString())
      .map((item) => ({ ...item, type: "appointment" })),
  ].sort((a, b) => {
    const dateA = new Date(a.dueDate || a.startTime || a.date);
    const dateB = new Date(b.dueDate || b.startTime || b.date);
    return dateA - dateB;
  });

  const getItemIcon = (type) => {
    switch (type) {
      case "event":
        return <VideoCameraIcon className="h-5 w-5 text-purple-500" />;
      case "appointment":
        return <UserIcon className="h-5 w-5 text-teal-500" />;
      default:
        return <CheckIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-blue-500" />
          Today's Schedule
        </h2>
        <span className="text-sm text-gray-500">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      <div className="divide-y divide-gray-100">
        {todaysItems.length > 0 ? (
          todaysItems.map((item) => (
            <div
              key={item.id}
              className={`p-4 transition-colors ${
                item.isCompleted ? "bg-gray-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Interactive Element */}
                {item.type === "task" ? (
                  <button
                    onClick={() => toggleTaskCompletion(item.id)}
                    className={`mt-1 flex-shrink-0 h-5 w-5 rounded border ${
                      item.isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {item.isCompleted && <CheckIcon className="h-4 w-4" />}
                  </button>
                ) : (
                  <div className="mt-1 flex-shrink-0">{getItemIcon(item.type)}</div>
                )}

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3
                      className={`font-medium ${
                        item.isCompleted ? "line-through text-gray-400" : "text-gray-800"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {item.isPriority && (
                        <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-xs text-gray-400">
                        {new Date(item.dueDate || item.startTime || item.date).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                  </div>

                  {item.description && (
                    <p
                      className={`text-sm ${
                        item.isCompleted ? "text-gray-400" : "text-gray-600"
                      } mt-1`}
                    >
                      {item.description}
                    </p>
                  )}

                  {/* Type-specific details */}
                  {item.type === "appointment" && (
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <UserIcon className="h-3 w-3" />
                      With: {item.withPerson}
                    </p>
                  )}
                  {item.type === "event" && (
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      {item.isVirtual ? (
                        <>
                          <VideoCameraIcon className="h-3 w-3" />
                          Virtual Event
                        </>
                      ) : (
                        <>
                          <ClockIcon className="h-3 w-3" />
                          {item.location}
                        </>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-400">
            <img src="/empty-state.svg" className="h-24 mx-auto mb-2" />
            <p>No scheduled items today. Enjoy your free time!</p>
          </div>
        )}
      </div>
    </div>
  );
}
