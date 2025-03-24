"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import { useTasks } from "@/app/_contexts/TaskContent";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const { tasks } = useTasks();

  const tasksOnDate = tasks.filter(
    (task) => task.due_date && new Date(task.due_date).toDateString() === date.toDateString()
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Calendar</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <Calendar
              onChange={setDate}
              value={date}
              className="border-none w-full"
              tileClassName={({ date: tileDate, view }) =>
                view === "month" && tileDate.toDateString() === new Date().toDateString()
                  ? "bg-blue-50 text-blue-600 rounded-full"
                  : null
              }
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Tasks for {date.toLocaleDateString()}
            </h2>
            {tasksOnDate.length > 0 ? (
              <div className="space-y-3">
                {tasksOnDate.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 border border-gray-100 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-gray-500">{task.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-4">No tasks scheduled</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
