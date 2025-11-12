"use client";

import type { TaskItem } from "@/app/_types";
import { CheckCircleIcon, RectangleStackIcon } from "@heroicons/react/24/outline";

interface TaskCardProps {
  task: TaskItem;
}

export default function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="p-4 hover:bg-gray-50 group transition-colors">
      <div className="flex items-start gap-3">
        <div
          className={`h-10 w-10 rounded-full flex items-center justify-center 
            ${task.isCompleted ? "bg-green-100" : "bg-blue-100"}`}
        >
          <RectangleStackIcon
            className={`h-5 w-5 ${task.isCompleted ? "text-green-600" : "text-blue-600"}`}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between gap-2">
            <h3
              className={`font-medium truncate ${
                task.isCompleted ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p
              className={`text-sm mt-1 truncate ${
                task.isCompleted ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {task.description}
            </p>
          )}

          <div className="mt-2 flex items-center justify-between text-xs">
            {task.dueDate && (
              <span className={task.isCompleted ? "text-gray-400" : "text-gray-500"}>
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}

            <button
              className={`flex items-center gap-1 ${
                task.isCompleted ? "text-green-600" : "text-gray-400 hover:text-blue-600"
              }`}
              aria-label={task.isCompleted ? "Mark as incomplete" : "Mark as complete"}
              type="button"
            >
              <CheckCircleIcon className="h-4 w-4" />
              <span>{task.isCompleted ? "Completed 🏆" : "Not completed"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
