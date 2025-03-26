"use client";

import { ChartBarIcon } from "@heroicons/react/24/outline";
import ActivityGraph from "../ui/ActivityGraph";

export default function Statistics() {
  const stats = {
    tasksCompleted: 142,
    productivityScore: 87,
    streakDays: 14,
    priorityTasks: 23,
    weeklyAverage: "5.2 tasks/day",
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold mb-6 flex items-center">
        <ChartBarIcon className="h-5 w-5 text-blue-500 mr-2" />
        Your Statistics
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <div className="text-blue-600 font-bold text-2xl">{stats.tasksCompleted}</div>
          <div className="text-gray-600 text-sm">Completed</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-green-600 font-bold text-2xl">{stats.productivityScore}%</div>
          <div className="text-gray-600 text-sm">Productivity</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <div className="text-purple-600 font-bold text-2xl">{stats.streakDays}</div>
          <div className="text-gray-600 text-sm">Day Streak</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4 text-center">
          <div className="text-red-600 font-bold text-2xl">{stats.priorityTasks}</div>
          <div className="text-gray-600 text-sm">Priority</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-yellow-600 font-bold text-2xl">{stats.weeklyAverage}</div>
          <div className="text-gray-600 text-sm">Daily Avg</div>
        </div>
      </div>

      <ActivityGraph />
    </div>
  );
}
