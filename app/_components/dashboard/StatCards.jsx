"use client";

import { useCalendar } from "@/app/_contexts/CalendarContext";
import { CalendarDaysIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon } from "@heroicons/react/24/solid";

export default function StatCards() {
  const { getTodaysSchedule, upcomingEvents, scheduleItems } = useCalendar();
  const todaysAgenda = getTodaysSchedule();

  const statInfo = [
    {
      id: 1,
      title: "Today's Agenda",
      icon: CalendarDaysIcon,
      colors: "bg-green-50 text-green-600",
      data: todaysAgenda.length,
    },
    {
      id: 2,
      title: "Upcoming Events",
      icon: UserGroupIcon,
      colors: "bg-indigo-50 text-indigo-600",
      data: upcomingEvents.length,
    },
    {
      id: 3,
      title: "Total Activities",
      icon: ClipboardDocumentIcon,
      colors: "bg-blue-50 text-blue-600",
      data: scheduleItems.length,
    },
  ];

  return (
    <section className="lg:col-span-3 grid grid-cols-1 max-[480px]:grid-cols-1 max-[640px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {statInfo.map((stat) => (
        <Card key={stat.id} stat={stat} />
      ))}
    </section>
  );
}

function Card({ stat }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-5 border border-gray-100`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{stat.title}</p>
          <h3 className="text-2xl font-bold mt-1">{stat.data}</h3>
        </div>

        <div className={`p-3 rounded-full ${stat.colors}`}>
          <stat.icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
