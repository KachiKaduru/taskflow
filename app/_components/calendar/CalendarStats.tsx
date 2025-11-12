"use client";

import { useScheduleMetrics } from "@/app/_hooks/useScheduleMetrics";
import {
  CalendarIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  UsersIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import CalendarStatCard from "./CalendarStatCard";

export default function CalendarStats() {
  const {
    taskCount,
    eventCount,
    appointmentCount,
    completedTasks,
    priorityTasks,
    taskCompletionRate,
    productivityScore,
    timeAllocation,
  } = useScheduleMetrics();

  // Format time allocation (minutes to hours)
  const formattedTimeAllocation =
    timeAllocation > 60 ? `${Math.round(timeAllocation / 60)}h` : `${timeAllocation}m`;

  const cardsData = [
    {
      title: "All Items",
      data: taskCount + eventCount + appointmentCount,
      colors: "bg-indigo-100 text-indigo-700",
      icon: CalendarIcon,
    },
    {
      title: "Tasks",
      data: taskCount,
      colors: "bg-blue-100 text-blue-700",
      icon: CheckCircleIcon,
      secondaryData: `${completedTasks} completed`,
    },
    {
      title: "Events",
      data: eventCount,
      colors: "bg-purple-100 text-purple-700",
      icon: StarIcon,
    },
    {
      title: "Meetings",
      data: appointmentCount,
      colors: "bg-teal-100 text-teal-700",
      icon: UsersIcon,
    },
    {
      title: "Priority",
      data: priorityTasks,
      colors: "bg-red-100 text-red-700",
      icon: ExclamationTriangleIcon,
      secondaryData: `${Math.round((priorityTasks / Math.max(1, taskCount)) * 100)}% of tasks`,
    },
    {
      title: "Productivity",
      data: `${productivityScore}%`,
      colors: "bg-green-100 text-green-700",
      icon: ChartBarIcon,
    },
    {
      title: "Time Allocation",
      data: formattedTimeAllocation,
      colors: "bg-amber-100 text-amber-700",
      icon: ClockIcon,
    },
    {
      title: "Completion",
      data: `${taskCompletionRate}%`,
      colors: "bg-emerald-100 text-emerald-700",
      icon: CheckCircleIcon,
      secondaryData: `${completedTasks}/${taskCount} tasks`,
    },
  ];

  return (
    // <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div className="stat-cards-grid">
      {cardsData.map((card) => (
        <CalendarStatCard card={card} key={card.title} />
      ))}
    </div>
  );
}
