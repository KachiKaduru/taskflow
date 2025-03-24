"use client";

import Link from "next/link";
import { useTasks } from "@/app/_contexts/TaskContent";

import TaskCard from "@/app/_components/dashboard/TaskCard";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function TaskPage() {
  const { tasks } = useTasks();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Tasks</h1>
        <Link
          href="/dashboard/tasks/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          <span>New Task</span>
        </Link>
      </div>

      <div className="grid gap-4">
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="bg-white rounded-xl p-8 text-center border-2 border-dashed border-gray-200">
            <h3 className="text-lg font-medium text-gray-500">No tasks yet</h3>
            <p className="text-gray-400 mt-2">Create your first task to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
