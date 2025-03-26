"use client";
import { useState } from "react";
import { useTasks } from "@/app/_contexts/TaskContent";
import {
  FunnelIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import TaskCard from "@/app/_components/tasks/TaskCard";
import AddNewTask from "@/app/_components/ui/AddNewTask";
import PageHeader from "@/app/_components/ui/PageHeader";
import TasksFilter from "@/app/_components/tasks/TasksFilter";
import TasksList from "@/app/_components/tasks/TasksList";

// export const metadata = {
//   title: "Tasks",
//   description: "All Tasks",
// };

export default function TasksPage() {
  const { tasks, toggleTaskCompletion } = useTasks();
  const [filters, setFilters] = useState({
    date: "",
    month: "",
    priority: false,
    completed: "all", // 'all', 'completed', 'incomplete'
  });

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => {
      const taskDate = new Date(task.due_date);
      const matchesDate =
        !filters.date || taskDate.toDateString() === new Date(filters.date).toDateString();
      const matchesMonth = !filters.month || taskDate.getMonth() === parseInt(filters.month);
      const matchesPriority = !filters.priority || task.isPriority;
      const matchesCompletion =
        filters.completed === "all" ||
        (filters.completed === "completed" && task.is_completed) ||
        (filters.completed === "incomplete" && !task.is_completed);

      return matchesDate && matchesMonth && matchesPriority && matchesCompletion;
    })
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="All Tasks">
        <AddNewTask />
      </PageHeader>

      <TasksFilter />

      <TasksList />
      {/* Filter Bar */}
      {/* <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
            <select
              value={filters.month}
              onChange={(e) => setFilters({ ...filters, month: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="">All Months</option>
              {months.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="h-4 w-4 absolute right-3 top-9 text-gray-400 pointer-events-none" />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.target.checked })}
                className="h-4 w-4 text-red-600 rounded focus:ring-red-500"
              />
              <span className="text-sm text-gray-700 flex items-center">
                <ExclamationTriangleIcon className="h-4 w-4 mr-1 text-red-500" />
                Priority Only
              </span>
            </label>

            <div className="relative">
              <select
                value={filters.completed}
                onChange={(e) => setFilters({ ...filters, completed: e.target.value })}
                className="pl-2 pr-8 py-1 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                <option value="all">All Tasks</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
              </select>
              <ChevronDownIcon className="h-3 w-3 absolute right-2 top-2 text-gray-400 pointer-events-none" />
            </div>

            <button
              onClick={() =>
                setFilters({
                  date: "",
                  month: "",
                  priority: false,
                  completed: "all",
                })
              }
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Reset
            </button>
          </div>
        </div>
      </div> */}

      {/* Task List */}
      {/* <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        {filteredTasks.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggleComplete={toggleTaskCompletion} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-400">
            <FunnelIcon className="h-12 w-12 mx-auto mb-2" />
            <p>No tasks match your filters</p>
          </div>
        )}
      </div> */}
    </div>
  );
}
