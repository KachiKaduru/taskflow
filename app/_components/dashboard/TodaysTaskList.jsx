"use client";

import { useTasks } from "@/app/_contexts/TaskContext";
import { CalendarIcon, CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function TodaysTaskList() {
  const { getTodaysTasks, toggleTaskCompletion } = useTasks();
  const todaysTasks = getTodaysTasks();

  // console.log(todaysTasks);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-blue-500" />
          Today's Tasks
        </h2>
      </div>

      <div className="divide-y divide-gray-100">
        {todaysTasks.length > 0 ? (
          todaysTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 transition-colors ${
                task.isCompleted ? "bg-gray-50" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`mt-1 flex-shrink-0 h-5 w-5 rounded border ${
                    task.isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {task.isCompleted && <CheckIcon className="h-4 w-4" />}
                </button>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3
                      className={`font-medium ${
                        task.isCompleted ? "line-through text-gray-400" : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </h3>
                    {task.isPriority && (
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  {task.description && (
                    <p
                      className={`text-sm ${
                        task.isCompleted ? "text-gray-400" : "text-gray-600"
                      } mt-1`}
                    >
                      {task.description}
                    </p>
                  )}
                  <p
                    className={`text-xs ${
                      task.isCompleted ? "text-gray-400" : "text-gray-500"
                    } mt-1`}
                  >
                    {new Date(task.dueDate).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-400">No tasks due today. Enjoy your day!</div>
        )}
      </div>
    </div>
  );
}
