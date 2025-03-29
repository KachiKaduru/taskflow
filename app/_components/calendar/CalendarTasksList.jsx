"use client";

import { useCalendar } from "@/app/_contexts/CalendarContext";
import { useCalendarTasks } from "@/app/_hooks/useCalendarTasks";
import { CalendarIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function CalendarTasksList() {
  const { date, view } = useCalendar();
  const { filteredTasks, totalTasks } = useCalendarTasks();

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-semibold flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-blue-500" />
          {view === "day"
            ? date.toLocaleDateString()
            : view === "week"
            ? `Week of ${date.toLocaleDateString()}`
            : `${date.toLocaleString("default", { month: "long" })} Tasks`}
        </h2>
      </div>

      <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
        {totalTasks > 0 ? (
          filteredTasks.map((task) => <TasksListItem task={task} key={task.id} />)
        ) : (
          <div className="p-6 text-center text-gray-400">No tasks scheduled</div>
        )}
      </div>
    </div>
  );
}

function TasksListItem({ task }) {
  return (
    <div className="p-4 hover:bg-gray-50">
      <div className="flex items-start gap-3">
        <div
          className={`mt-1 flex-shrink-0 h-4 w-4 rounded border ${
            task.isCompleted ? "bg-green-500 border-green-500" : "border-gray-300"
          }`}
        />

        <div className="flex-1">
          <div className="flex justify-between">
            <h3
              className={`font-medium ${
                task.isCompleted ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {task.title}
            </h3>
            {task.isPriority && <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />}
          </div>

          <p className="text-sm text-gray-500">
            {new Date(task.dueDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
