"use client";

import type { ScheduleItem } from "@/app/_types";
import { useCalendar } from "@/app/_contexts/CalendarContext";
import {
  CalendarIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  VideoCameraIcon,
  UserIcon,
  ClockIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";

export default function ScheduleOverview() {
  const { getTodaysSchedule } = useCalendar();

  const todayList = getTodaysSchedule();

  const getItemIcon = (type: ScheduleItem["type"]) => {
    switch (type) {
      case "event":
        return <VideoCameraIcon className="h-5 w-5 text-purple-500" />;
      case "appointment":
        return <UserIcon className="h-5 w-5 text-teal-500" />;
      default:
        return <CheckIcon className="h-5 w-5 text-blue-500" />;
    }
  };

  const resolveDateString = (item: ScheduleItem): string | null => {
    if (item.type === "task") {
      return item.dueDate ?? item.date ?? null;
    }

    if (item.type === "event") {
      return item.startTime ?? null;
    }

    return item.date ?? null;
  };

  const isTaskCompleted = (item: ScheduleItem) =>
    item.type === "task" ? Boolean(item.isCompleted) : false;

  const isTaskPriority = (item: ScheduleItem) =>
    item.type === "task" ? Boolean(item.isPriority) : false;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-blue-500" />
          Today&apos;s Schedule
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
        {todayList.length > 0 ? (
          todayList.map((item) => (
            <div
              key={item.id}
              className={`p-4 transition-colors ${
                isTaskCompleted(item) ? "bg-gray-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Interactive Element */}
                {item.type === "task" ? (
                  <button
                    className={`mt-1 flex-shrink-0 h-5 w-5 rounded border ${
                      isTaskCompleted(item)
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {isTaskCompleted(item) && <CheckIcon className="h-4 w-4" />}
                  </button>
                ) : (
                  <div className="mt-1 flex-shrink-0">{getItemIcon(item.type)}</div>
                )}

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3
                      className={`font-medium ${
                      isTaskCompleted(item) ? "line-through text-gray-400" : "text-gray-800"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {isTaskPriority(item) && (
                        <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-xs text-gray-400">
                        {(() => {
                          const dateString = resolveDateString(item);
                          return dateString
                            ? new Date(dateString).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "—";
                        })()}
                      </span>
                    </div>
                  </div>

                  {item.description && (
                    <p
                      className={`text-sm ${
                        isTaskCompleted(item) ? "text-gray-400" : "text-gray-600"
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
            <ClipboardIcon className="h-20 mx-auto mb-2" />
            <p>No scheduled items today. Enjoy your free time!</p>
          </div>
        )}
      </div>
    </div>
  );
}
