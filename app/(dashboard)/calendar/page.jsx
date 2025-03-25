"use client";
import { useState } from "react";
import { useTasks } from "@/app/_contexts/TaskContent";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  CalendarIcon,
  ArrowPathIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function CalendarPage() {
  const { tasks } = useTasks();
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState("day"); // 'day', 'week', 'month'

  // Filter tasks for selected date/week/month
  const filteredTasks = tasks.filter((task) => {
    const taskDate = new Date(task.due_date);
    if (view === "day") {
      return taskDate.toDateString() === date.toDateString();
    } else if (view === "week") {
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      return taskDate >= startOfWeek && taskDate <= endOfWeek;
    } else {
      // month
      return (
        taskDate.getMonth() === date.getMonth() && taskDate.getFullYear() === date.getFullYear()
      );
    }
  });

  const completedTasks = filteredTasks.filter((task) => task.is_completed).length;
  const completionRate =
    filteredTasks.length > 0 ? Math.round((completedTasks / filteredTasks.length) * 100) : 0;

  const priorityTasks = filteredTasks.filter((task) => task.isPriority).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setView("day")}
            className={`px-3 py-1 rounded-lg ${
              view === "day" ? "bg-blue-100 text-blue-600" : "text-gray-600"
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setView("week")}
            className={`px-3 py-1 rounded-lg ${
              view === "week" ? "bg-blue-100 text-blue-600" : "text-gray-600"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setView("month")}
            className={`px-3 py-1 rounded-lg ${
              view === "month" ? "bg-blue-100 text-blue-600" : "text-gray-600"
            }`}
          >
            Month
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <Calendar
            onChange={setDate}
            value={date}
            className="border-none w-full"
            view={view === "month" ? "month" : "month"} // Always show month view for navigation
            tileClassName={({ date: tileDate, view }) => {
              let classes = "";
              if (tileDate.toDateString() === new Date().toDateString()) {
                classes += " bg-blue-50 text-blue-600 rounded-full";
              }
              if (view === "month" && tileDate.getMonth() !== date.getMonth()) {
                classes += " text-gray-400";
              }
              return classes;
            }}
          />
        </div>

        {/* Stats and Tasks */}
        <div className="lg:col-span-1 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Tasks</p>
                  <h3 className="text-xl font-bold">{filteredTasks.length}</h3>
                </div>
                <div className="p-2 rounded-full bg-blue-50 text-blue-600">
                  <CalendarIcon className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <h3 className="text-xl font-bold">{completionRate}%</h3>
                </div>
                <div className="p-2 rounded-full bg-green-50 text-green-600">
                  <CheckCircleIcon className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Priority</p>
                  <h3 className="text-xl font-bold">{priorityTasks}</h3>
                </div>
                <div className="p-2 rounded-full bg-red-50 text-red-600">
                  <ExclamationTriangleIcon className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Productivity</p>
                  <h3 className="text-xl font-bold">
                    {filteredTasks.length > 0 ? Math.round(filteredTasks.length / 3) : 0}/10
                  </h3>
                </div>
                <div className="p-2 rounded-full bg-purple-50 text-purple-600">
                  <ChartBarIcon className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Tasks List */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-blue-500" />
                {view === "day"
                  ? date.toLocaleDateString()
                  : view === "week"
                  ? `Week of ${date.toLocaleDateString()}`
                  : `${date.toLocaleString("default", { month: "long" })} Tasks`}
              </h2>
            </div>
            <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <div key={task.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-1 flex-shrink-0 h-4 w-4 rounded border ${
                          task.is_completed ? "bg-green-500 border-green-500" : "border-gray-300"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3
                            className={`font-medium ${
                              task.is_completed ? "line-through text-gray-400" : "text-gray-800"
                            }`}
                          >
                            {task.title}
                          </h3>
                          {task.isPriority && (
                            <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(task.due_date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-400">No tasks scheduled</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
