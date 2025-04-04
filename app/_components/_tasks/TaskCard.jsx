"use client";

import { CheckIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTasks } from "@/app/_contexts/TaskContext";

export default function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex justify-between">
          <h3 className="font-medium text-gray-800">{task.title}</h3>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
        {task.description && <p className="text-gray-600 mt-2 text-sm">{task.description}</p>}
        {task.dueDate && (
          <div className="mt-3 flex items-center text-sm text-gray-500">
            <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>
      <div className="bg-gray-50 px-5 py-3 flex justify-end">
        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
          <CheckIcon className="h-4 w-4" />
          <span>Complete</span>
        </button>
      </div>
    </div>
  );
}
