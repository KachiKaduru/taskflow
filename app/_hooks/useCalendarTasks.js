"use client";

import { useMemo } from "react";
import { useTasks } from "../_contexts/TaskContext";
import { useCalendar } from "../_contexts/CalendarContext";

export function useCalendarTasks() {
  const { tasks } = useTasks();
  const { date, view } = useCalendar();

  return useMemo(() => {
    const filteredTasks = tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      if (view === "day") {
        return taskDate.toDateString() === date.toDateString();
      } else if (view === "week") {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return taskDate >= startOfWeek && taskDate <= endOfWeek;
      } else {
        return (
          taskDate.getMonth() === date.getMonth() && taskDate.getFullYear() === date.getFullYear()
        );
      }
    });

    const completedTasks = filteredTasks.filter((task) => task.isCompleted).length;
    const completionRate =
      filteredTasks.length > 0 ? Math.round((completedTasks / filteredTasks.length) * 100) : 0;
    const priorityTasks = filteredTasks.filter((task) => task.isPriority).length;

    return {
      filteredTasks,
      totalTasks: filteredTasks.length,
      completionRate,
      priorityTasks,
      // productivityScore: filteredTasks.length > 0 ? Math.round(filteredTasks.length / 3) : 0,
      productivityScore:
        completedTasks.length > 0 ? Math.round(completedTasks.length / filteredTasks.length) : 0,
    };
  }, [tasks, date, view]); // Only recalculate when these change
}
