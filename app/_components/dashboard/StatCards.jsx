"use client";
import { useAppointments } from "@/app/_contexts/AppointmentContext";
import { useCalendar } from "@/app/_contexts/CalendarContext";
import { useEvents } from "@/app/_contexts/EventContext";
import { useTasks } from "@/app/_contexts/TaskContext";
import { CalendarIcon, ClockIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon, UserGroupIcon } from "@heroicons/react/24/solid";

export default function StatCards() {
  const { tasks, getCompletionRate, getTodaysTasks } = useTasks();
  const { events } = useEvents();
  const { appointments } = useAppointments();
  const { scheduleItems } = useCalendar();

  const todayTasks = getTodaysTasks();
  const completionRate = getCompletionRate();
  const priorityTasks = tasks.filter((t) => t.isPriority).length;

  // New productivity metrics
  const timeAllocated = tasks.reduce((sum, task) => sum + (task.duration || 0), 0);
  const completedToday = todayTasks.filter((t) => t.isCompleted).length;
  const upcomingEvents = events.filter((e) => new Date(e.startTime) > new Date()).length;

  const statInfo = [
    {
      id: 1,
      title: "Total Items",
      icon: ListBulletIcon,
      colors: "bg-blue-50 text-blue-600",
      data: scheduleItems.length,
      // data: tasks.length + events.length + appointments.length,
      trend: "↑ 12%",
    },
    {
      id: 2,
      title: "Today's Agenda",
      icon: CalendarIcon,
      colors: "bg-green-50 text-green-600",
      data:
        todayTasks.length +
        appointments.filter((a) => new Date(a.date).toDateString() === new Date().toDateString())
          .length,
      subtext: `${completedToday} completed`,
    },
    {
      id: 3,
      title: "Productivity",
      icon: CalendarIcon,
      colors: "bg-purple-50 text-purple-600",
      data: `${completionRate}%`,
      progress: completionRate,
    },
    {
      id: 4,
      title: "Priority Items",
      icon: ExclamationTriangleIcon,
      colors: "bg-red-50 text-red-600",
      data: priorityTasks,
      alert: priorityTasks > 3,
    },
    {
      id: 5,
      title: "Time Allocated",
      icon: ClockIcon,
      colors: "bg-amber-50 text-amber-600",
      data: `${Math.floor(timeAllocated / 60)}h ${timeAllocated % 60}m`,
    },
    {
      id: 6,
      title: "Upcoming Events",
      icon: UserGroupIcon,
      colors: "bg-indigo-50 text-indigo-600",
      data: upcomingEvents,
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {statInfo.map((stat) => (
        <Card key={stat.id} stat={stat} />
      ))}
    </section>
  );
}

function Card({ stat }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-5 border ${
        stat.alert ? "border-red-200" : "border-gray-100"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{stat.title}</p>
          <h3 className="text-2xl font-bold mt-1">{stat.data}</h3>
          {stat.subtext && <p className="text-xs text-gray-400 mt-1">{stat.subtext}</p>}
          {stat.trend && <span className="text-xs text-green-500">{stat.trend}</span>}
        </div>
        <div className={`p-3 rounded-full ${stat.colors}`}>
          <stat.icon className="h-5 w-5" />
        </div>
      </div>

      {stat.progress && stat.progress > 0 ? (
        <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-purple-500 h-2 rounded-full"
            style={{ width: `${stat.progress}%` }}
          ></div>
        </div>
      ) : (
        stat.progress < 1 && (
          <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
            <div className="bg-purple-500 h-2 rounded-full" style={{ width: `2%` }}></div>
          </div>
        )
      )}
    </div>
  );
}
