"use client";

import { useTasks } from "@/app/_contexts/TaskContext";
import { CalendarIcon, ChartBarIcon, ListBulletIcon } from "@heroicons/react/24/outline";

export default function StatCards({}) {
  const { tasks, getCompletionRate, getTodaysTasks } = useTasks();

  // console.log(tasks);

  const todayTasks = getTodaysTasks();
  const rate = getCompletionRate();

  const statInfo = [
    {
      id: 1,
      title: "Total Tasks",
      icon: ListBulletIcon,
      colors: "bg-blue-50 text-blue-600",
      data: tasks.length,
    },
    {
      id: 2,
      title: "Today's Tasks",
      icon: CalendarIcon,
      colors: "bg-green-50 text-green-600",
      data: todayTasks.length,
    },
    {
      id: 3,
      title: "Completion Rate",
      icon: ChartBarIcon,
      colors: "bg-purple-50 text-purple-600",
      data: `${rate}%`,
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statInfo.map((stat) => (
        <Card key={stat.id} stat={stat} />
      ))}
    </section>
  );
}

function Card({ stat }) {
  const { title, colors, data } = stat;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{data}</h3>
        </div>
        <div className={`p-3 rounded-full ${colors}`}>
          <stat.icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
