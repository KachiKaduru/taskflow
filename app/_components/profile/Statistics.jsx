// "use client";

// import { ChartBarIcon } from "@heroicons/react/24/outline";
// import ActivityGraph from "../ui/ActivityGraph";

// export default function Statistics() {
//   const stats = {
//     tasksCompleted: 142,
//     productivityScore: 87,
//     streakDays: 14,
//     priorityTasks: 23,
//     weeklyAverage: "5.2 tasks/day",
//   };

//   return (
//     <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//       <h3 className="text-lg font-semibold mb-6 flex items-center">
//         <ChartBarIcon className="h-5 w-5 text-blue-500 mr-2" />
//         Your Statistics
//       </h3>

//       <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
//         <div className="bg-blue-50 rounded-lg p-4 text-center">
//           <div className="text-blue-600 font-bold text-2xl">{stats.tasksCompleted}</div>
//           <div className="text-gray-600 text-sm">Completed</div>
//         </div>
//         <div className="bg-green-50 rounded-lg p-4 text-center">
//           <div className="text-green-600 font-bold text-2xl">{stats.productivityScore}%</div>
//           <div className="text-gray-600 text-sm">Productivity</div>
//         </div>
//         <div className="bg-purple-50 rounded-lg p-4 text-center">
//           <div className="text-purple-600 font-bold text-2xl">{stats.streakDays}</div>
//           <div className="text-gray-600 text-sm">Day Streak</div>
//         </div>
//         <div className="bg-red-50 rounded-lg p-4 text-center">
//           <div className="text-red-600 font-bold text-2xl">{stats.priorityTasks}</div>
//           <div className="text-gray-600 text-sm">Priority</div>
//         </div>
//         <div className="bg-yellow-50 rounded-lg p-4 text-center">
//           <div className="text-yellow-600 font-bold text-2xl">{stats.weeklyAverage}</div>
//           <div className="text-gray-600 text-sm">Daily Avg</div>
//         </div>
//       </div>

//       <ActivityGraph />
//     </div>
//   );
// }

"use client";

import { ChartBarIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import ActivityGraph from "../ui/ActivityGraph";
import { useTasks } from "@/app/_contexts/TaskContext";
import { useEvents } from "@/app/_contexts/EventContext";
import { useAppointments } from "@/app/_contexts/AppointmentContext";
import { useMemo } from "react";

export default function Statistics() {
  const { tasks, getCompletionRate } = useTasks();
  const { events } = useEvents();
  const { appointments } = useAppointments();

  const stats = useMemo(() => {
    // Task Metrics
    const completedTasks = tasks.filter((t) => t.isCompleted).length;
    const priorityTasks = tasks.filter((t) => t.isPriority).length;
    const taskCompletionRate = getCompletionRate();

    // Event Metrics
    const upcomingEvents = events.filter((e) => new Date(e.startTime) > new Date()).length;

    // Appointment Metrics
    const completedAppointments = appointments.filter((a) => new Date(a.date) < new Date()).length;

    // Combined Productivity Score (weighted calculation)
    const productivityScore = Math.min(
      100,
      Math.round(
        taskCompletionRate * 0.6 +
          (completedAppointments / Math.max(1, appointments.length)) * 30 +
          (upcomingEvents > 0 ? 10 : 0)
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
      totalActivities: tasks.length + events.length + appointments.length,
      weeklyAverage: calculateWeeklyAverage(tasks, events, appointments),
    };
  }, [tasks, events, appointments]);

  const statisticsArray = [
    { value: stats.tasksCompleted, label: "Tasks Done", color: "blue", icon: CheckBadgeIcon },
    { value: stats.priorityTasks, label: "Priority Tasks", color: "red", icon: CheckBadgeIcon },
    {
      value: stats.upcomingEvents,
      label: "Upcoming Events",
      color: "purple",
      icon: CheckBadgeIcon,
    },
    {
      value: stats.appointmentsAttended,
      label: "Meetings Attended",
      color: "teal",
      icon: CheckBadgeIcon,
    },
    {
      value: `${stats.productivityScore}%`,
      label: "Productivity",
      color: "green",
      icon: CheckBadgeIcon,
    },
    { value: stats.streakDays, label: "Day Streak", color: "yellow", icon: CheckBadgeIcon },
    {
      value: stats.totalActivities,
      label: "Total Activities",
      color: "indigo",
      icon: CheckBadgeIcon,
    },
    { value: stats.weeklyAverage, label: "Daily Average", color: "orange", icon: CheckBadgeIcon },
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
      blue: "bg-blue-50",
      red: "bg-red-50",
      green: "bg-green-50",
      purple: "bg-purple-50",
      teal: "bg-teal-50",
      yellow: "bg-yellow-50",
      indigo: "bg-indigo-50",
      orange: "bg-orange-50",
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
