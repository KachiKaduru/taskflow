"use client";

import { useTasks } from "@/app/_contexts/TaskContent";
import { ChartBarIcon, CalendarIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function DashboardHome() {
  const { tasks } = useTasks();
  const today = new Date().toDateString();

  // Filter tasks
  const todaysTasks = tasks.filter(
    (task) => task.due_date && new Date(task.due_date).toDateString() === today
  );
  const completedTasks = tasks.filter((task) => task.is_completed).length;
  const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex gap-3">
          <Link
            href="/dashboard/tasks/new"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
          >
            <ListBulletIcon className="h-5 w-5" />
            <span>New Task</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Task Count */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Tasks</p>
              <h3 className="text-2xl font-bold mt-1">{tasks.length}</h3>
            </div>
            <div className="p-3 rounded-full bg-blue-50 text-blue-600">
              <ListBulletIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Today's Tasks</p>
              <h3 className="text-2xl font-bold mt-1">{todaysTasks.length}</h3>
            </div>
            <div className="p-3 rounded-full bg-green-50 text-green-600">
              <CalendarIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Completion Rate */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Completion Rate</p>
              <h3 className="text-2xl font-bold mt-1">{completionRate}%</h3>
            </div>
            <div className="p-3 rounded-full bg-purple-50 text-purple-600">
              <ChartBarIcon className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Tasks Section */}
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
              <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    {task.description && (
                      <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                    )}
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(task.due_date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-400">No tasks due today. Enjoy your day!</div>
          )}
        </div>
      </div>
    </div>
  );
}
