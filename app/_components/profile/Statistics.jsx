"use client";

import { useMemo } from "react";
import {
  CalendarDaysIcon,
  ChartBarIcon,
  InformationCircleIcon,
  PercentBadgeIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import ActivityGraph from "../ui/ActivityGraph";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import { useCalendar } from "@/app/_contexts/CalendarContext";
import { useScheduleMetrics } from "@/app/_hooks/useScheduleMetrics";
import { AverageIcon, PriorityIcon, TotalActivitiesIcon } from "../_icons/icons";

export default function Statistics() {
  const { scheduleItems, upcomingEvents } = useCalendar();
  const { completedTasks } = useScheduleMetrics();

  const tasks = scheduleItems.map((item) => item.type === "task");
  const events = scheduleItems.map((item) => item.type === "event");
  const appointments = scheduleItems.map((item) => item.type === "appointment");

  const stats = useMemo(() => {
    const completionRate = () => {
      if (tasks.length === 0) return 0;
      const completed = tasks.filter((task) => task.isCompleted).length;
      return Math.round((completed / tasks.length) * 100);
    };

    // Task Metrics
    const priorityTasks = tasks.filter((item) => item.isPriority).length;
    const taskCompletionRate = completionRate();

    // Event Metrics

    // Appointment Metrics
    const completedAppointments = appointments.filter((a) => new Date(a.date) < new Date()).length;

    // Combined Productivity Score (weighted calculation)
    const productivityScore = Math.min(
      100,
      Math.round(
        taskCompletionRate * 0.6 +
          (completedAppointments / Math.max(1, appointments.length)) * 30 +
          (upcomingEvents.length > 0 ? 10 : 0)
      )
    );

    // Streak Calculation (example - implement your actual streak logic)
    const streakDays = calculateStreak(tasks);

    return {
      tasksCompleted: completedTasks,
      priorityTasks,
      taskCompletionRate,
      upcomingEvents,
      appointmentsAttended: completedAppointments,
      productivityScore,
      streakDays,
      totalActivities: scheduleItems.length,
      weeklyAverage: calculateWeeklyAverage(tasks, events, appointments),
    };
  }, [scheduleItems]);

  const statisticsArray = [
    { value: stats.tasksCompleted, label: "Tasks Done", color: "blue", icon: CheckCircleIcon },
    {
      value: stats.priorityTasks,
      label: "Priority Tasks",
      color: "red",
      icon: PriorityIcon,
    },
    {
      value: stats.upcomingEvents,
      label: "Upcoming Events",
      color: "purple",
      icon: CalendarDaysIcon,
    },
    {
      value: stats.appointmentsAttended,
      label: "Meetings Attended",
      color: "teal",
      icon: InformationCircleIcon,
    },
    {
      value: `${stats.productivityScore}%`,
      label: "Productivity",
      color: "green",
      icon: PercentBadgeIcon,
    },
    { value: stats.streakDays, label: "Day Streak", color: "yellow", icon: RocketLaunchIcon },
    {
      value: stats.totalActivities,
      label: "Total Activities",
      color: "indigo",
      icon: TotalActivitiesIcon,
    },
    { value: stats.weeklyAverage, label: "Daily Average", color: "orange", icon: AverageIcon },
  ];

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold mb-6 flex items-center">
        <ChartBarIcon className="h-5 w-5 text-blue-500 mr-2" />
        Your Productivity Dashboard
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
        {statisticsArray.map((stat) => (
          <StatCard stat={stat} key={stat.color} />
        ))}
      </div>

      <ActivityGraph tasks={tasks} events={events} appointments={appointments} />
    </div>
  );
}

// Helper component for consistent stat cards
function StatCard({ stat }) {
  const colorClasses = {
    bg: {
      blue: "bg-blue-50 text-blue-600",
      red: "bg-red-50 text-red-600",
      green: "bg-green-50 text-green-600",
      purple: "bg-purple-50 text-purple-600",
      teal: "bg-teal-50 text-teal-600",
      yellow: "bg-yellow-50 text-yellow-600",
      indigo: "bg-indigo-50 text-indigo-600",
      orange: "bg-orange-50 text-orange-600",
    },
    text: {
      blue: "text-blue-600",
      red: "text-red-600",
      green: "text-green-600",
      purple: "text-purple-600",
      teal: "text-teal-600",
      yellow: "text-yellow-600",
      indigo: "text-indigo-600",
      orange: "text-orange-600",
    },
  };

  return (
    <div className={`${colorClasses.bg[stat.color]} rounded-lg p-4 text-center`}>
      <div className="flex items-center justify-center gap-1">
        <stat.icon className="w-6 h-6" />

        <div className={`${colorClasses.text[stat.color]} font-bold text-2xl`}>{stat.value}</div>
      </div>
      <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
    </div>
  );
}

// Helper functions (implement according to your business logic)
function calculateStreak(tasks) {
  // Implement your actual streak calculation logic
  // This is just a placeholder
  const completedDates = tasks
    .filter((t) => t.isCompleted)
    .map((t) => new Date(t.date || t.dueDate).toDateString());
  // .map((t) => new Date(t.completedAt || t.dueDate).toDateString());

  let streak = 0;
  const today = new Date();

  while (completedDates.includes(today.toDateString())) {
    streak++;
    today.setDate(today.getDate() - 1);
  }

  return streak;
}

function calculateWeeklyAverage(tasks, events, appointments) {
  // Calculate average activities per day
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toDateString();
  });

  const dailyCounts = last7Days.map((date) => {
    return (
      tasks.filter((t) => new Date(t.dueDate).toDateString() === date).length +
      events.filter((e) => new Date(e.startTime).toDateString() === date).length +
      appointments.filter((a) => new Date(a.date).toDateString() === date).length
    );
  });

  const average = dailyCounts.reduce((a, b) => a + b, 0) / 7;
  return average.toFixed(1);
}
