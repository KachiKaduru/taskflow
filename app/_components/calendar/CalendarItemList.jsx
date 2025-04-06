"use client";

import { useCalendar } from "@/app/_contexts/CalendarContext";
import { useScheduleMetrics } from "@/app/_hooks/useScheduleMetrics";
import {
  CalendarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  UserIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function CalendarItemList() {
  const { date, view, getFilteredItems } = useCalendar();
  const items = getFilteredItems();

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

      {items.length > 0 ? (
        <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
          {items.map((item) => {
            switch (item.type) {
              case "task":
                return <ScheduleListItem key={`task-${item.id}`} item={item} type="task" />;
              case "event":
                return <ScheduleListItem key={`event-${item.id}`} item={item} type="event" />;
              case "appointment":
                return (
                  <ScheduleListItem key={`appointment-${item.id}`} item={item} type="appointment" />
                );
              default:
                return null;
            }
          })}
        </div>
      ) : (
        <div className="p-6 text-center text-gray-400">No items scheduled</div>
      )}
    </div>
  );
}

function ScheduleListItem({ item, type }) {
  const getIcon = () => {
    switch (type) {
      case "task":
        return (
          <div
            className={`mt-1 flex-shrink-0 h-4 w-4 rounded border ${
              item.isCompleted ? "bg-green-500 border-green-500" : "border-gray-300"
            }`}
          />
        );
      case "event":
        return <ClockIcon className="h-4 w-4 text-purple-500 mt-1" />;
      case "appointment":
        return <UserIcon className="h-4 w-4 text-teal-500 mt-1" />;
      default:
        return null;
    }
  };

  const getTimeString = () => {
    const date = item.dueDate || item.startTime || item.date;
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-4 hover:bg-gray-50">
      <div className="flex items-start gap-3">
        {getIcon()}

        <div className="flex-1">
          <div className="flex justify-between">
            <h3
              className={`font-medium ${
                item.isCompleted ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {item.title}
            </h3>
            <div className="flex gap-2">
              {type === "task" && item.isPriority && (
                <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
              )}
              {type === "task" && item.isCompleted && (
                <CheckCircleIcon className="h-4 w-4 text-green-500" />
              )}
            </div>
          </div>

          <p className="text-sm text-gray-500">
            {getTimeString()}
            {type === "event" && item.location && ` • ${item.location}`}
            {type === "appointment" && item.withPerson && ` • With ${item.withPerson}`}
          </p>
        </div>
      </div>
    </div>
  );
}
