"use client";

import { useCalendarTasks } from "@/app/_hooks/useCalendarTasks";
import {
  CalendarIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import CalendarStatCard from "./CalendarStatCard";

export default function CalendarStats() {
  const { totalTasks, completionRate, priorityTasks, productivityScore } = useCalendarTasks();

  const cardsData = [
    { title: "Tasks", data: totalTasks, colors: "bg-blue-50 text-blue-600", icon: CalendarIcon },
    {
      title: "Completed",
      data: completionRate,
      colors: "bg-green-50 text-green-600",
      icon: CheckCircleIcon,
    },
    {
      title: "Priority",
      data: priorityTasks,
      colors: "bg-red-50 text-red-600",
      icon: ExclamationTriangleIcon,
    },
    {
      title: "Productivity",
      data: `${productivityScore}/10`,
      colors: "bg-purple-50 text-purple-600",
      icon: ChartBarIcon,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {cardsData.map((card) => (
        <CalendarStatCard card={card} key={card.title} />
      ))}
    </div>
  );
}
