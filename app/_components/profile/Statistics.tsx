"use client";

import {
  CalendarDaysIcon,
  ChartBarIcon,
  InformationCircleIcon,
  PercentBadgeIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import ActivityGraph from "../ui/ActivityGraph";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import type { AppointmentItem, EventItem, TaskItem } from "@/app/_types";
import { useCalendar } from "@/app/_contexts/CalendarContext";
import { useScheduleMetrics } from "@/app/_hooks/useScheduleMetrics";
import { AverageIcon, PriorityIcon, TotalActivitiesIcon } from "../_icons/icons";

type StatColor =
  | "blue"
  | "red"
  | "green"
  | "purple"
  | "teal"
  | "yellow"
  | "indigo"
  | "orange";

interface StatisticSummary {
  value: number | string;
  label: string;
  color: StatColor;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function Statistics() {
  const { scheduleItems, upcomingEvents } = useCalendar();
  const { completedTasks } = useScheduleMetrics();

  const tasks = scheduleItems.filter(
    (item): item is TaskItem & { type: "task" } => item.type === "task"
  );
  const events = scheduleItems.filter(
    (item): item is EventItem & { type: "event" } => item.type === "event"
  );
  const appointments = scheduleItems.filter(
    (item): item is AppointmentItem & { type: "appointment" } => item.type === "appointment"
  );

  const completionRate = () => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((task) => task.isCompleted).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const priorityTasks = tasks.filter((item) => item.isPriority).length;
  const taskCompletionRate = completionRate();

  const completedAppointments = appointments.filter(
    (appointment) => new Date(appointment.date) < new Date()
  ).length;

  const productivityScore = Math.min(
    100,
    Math.round(
      taskCompletionRate * 0.6 +
        (completedAppointments / Math.max(1, appointments.length)) * 30 +
        (upcomingEvents.length > 0 ? 10 : 0)
    )
  );

  const streakDays = calculateStreak(tasks);

  const stats = {
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

  const statisticsArray: StatisticSummary[] = [
    { value: stats.tasksCompleted, label: "Tasks Done", color: "blue", icon: CheckCircleIcon },
    {
      value: stats.priorityTasks,
      label: "Priority Tasks",
      color: "red",
      icon: PriorityIcon,
    },
    {
      value: stats.upcomingEvents.length,
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

      <ActivityGraph />
    </div>
  );
}

function StatCard({ stat }: { stat: StatisticSummary }) {
  const colorClasses: Record<
    "bg" | "text",
    Record<
      StatColor,
      string
    >
  > = {
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
function calculateStreak(tasks: Array<TaskItem & { type: "task" }>): number {
  const completedDates = tasks
    .filter((task) => task.isCompleted)
    .map((task) => {
      const source = task.date ?? task.dueDate ?? null;
      return source ? new Date(source).toDateString() : null;
    })
    .filter((dateString): dateString is string => Boolean(dateString));

  let streak = 0;
  const today = new Date();

  while (completedDates.includes(today.toDateString())) {
    streak++;
    today.setDate(today.getDate() - 1);
  }

  return streak;
}

function calculateWeeklyAverage(
  tasks: TaskItem[],
  events: EventItem[],
  appointments: AppointmentItem[]
): string {
  // Calculate average activities per day
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toDateString();
  });

  const dailyCounts = last7Days.map((date) => {
    return (
      tasks.filter((task) => {
        const source = task.dueDate ?? task.date ?? null;
        return source ? new Date(source).toDateString() === date : false;
      }).length +
      events.filter((event) => {
        return event.startTime ? new Date(event.startTime).toDateString() === date : false;
      }).length +
      appointments.filter((appointment) => {
        return appointment.date ? new Date(appointment.date).toDateString() === date : false;
      }).length
    );
  });

  const average = dailyCounts.reduce((a, b) => a + b, 0) / 7;
  return average.toFixed(1);
}
