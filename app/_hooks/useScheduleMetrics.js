"use client";

import { useMemo } from "react";
import { useTasks } from "../_contexts/TaskContext";
import { useEvents } from "../_contexts/EventContext";
import { useAppointments } from "../_contexts/AppointmentContext";
import { useCalendar } from "../_contexts/CalendarContext";

export function useScheduleMetrics() {
  const { tasks } = useTasks();
  const { events } = useEvents();
  const { appointments } = useAppointments();
  const { date, view, scheduleItems } = useCalendar();

  return useMemo(() => {
    // Combine all items with their types
    // const allItems = [
    //   ...tasks.map((task) => ({ ...task, type: "task" })),
    //   ...events.map((event) => ({ ...event, type: "event" })),
    //   ...appointments.map((appt) => ({ ...appt, type: "appointment" })),
    // ];

    // Filter items based on current calendar view
    const filteredItems = scheduleItems.filter((item) => {
      const itemDate = new Date(item.dueDate || item.date || item.startTime);

      if (view === "day") {
        return itemDate.toDateString() === date.toDateString();
      }

      if (view === "week") {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return itemDate >= startOfWeek && itemDate <= endOfWeek;
      }

      // Month view
      return (
        itemDate.getMonth() === date.getMonth() && itemDate.getFullYear() === date.getFullYear()
      );
    });

    // Sort by date
    const sortedItems = [...filteredItems].sort((a, b) => {
      const dateA = new Date(a.dueDate || a.date || a.startTime);
      const dateB = new Date(b.dueDate || b.date || b.startTime);
      return dateA - dateB;
    });

    // Calculate metrics
    const taskItems = sortedItems.filter((item) => item.type === "task");
    const completedTasks = taskItems.filter((task) => task.isCompleted).length;
    const priorityTasks = taskItems.filter((task) => task.isPriority).length;
    const taskCompletionRate =
      taskItems.length > 0 ? Math.round((completedTasks / taskItems.length) * 100) : 0;

    const eventCount = sortedItems.filter((item) => item.type === "event").length;
    const appointmentCount = sortedItems.filter((item) => item.type === "appointment").length;

    // Calculate time allocation (example metric)
    const totalDuration = sortedItems.reduce((total, item) => {
      return total + (item.duration || 0); // Assuming events/appointments have duration
    }, 0);

    return {
      // Core items
      allItems: sortedItems,
      tasks: taskItems,
      events: sortedItems.filter((item) => item.type === "event"),
      appointments: sortedItems.filter((item) => item.type === "appointment"),

      // Count metrics
      totalItems: sortedItems.length,
      taskCount: taskItems.length,
      eventCount,
      appointmentCount,
      completedTasks,
      priorityTasks,

      // Percentage metrics
      taskCompletionRate,
      taskPriorityRatio:
        taskItems.length > 0 ? Math.round((priorityTasks / taskItems.length) * 100) : 0,
      timeAllocation: totalDuration, // In minutes

      // Productivity score (customize as needed)
      productivityScore: calculateProductivityScore(
        taskItems.length,
        completedTasks,
        priorityTasks
      ),

      // Grouped by type for easy consumption
      byType: {
        task: taskItems,
        event: sortedItems.filter((item) => item.type === "event"),
        appointment: sortedItems.filter((item) => item.type === "appointment"),
      },
    };
  }, [tasks, events, appointments, date, view]);
}

// Helper function for productivity calculation
function calculateProductivityScore(totalTasks, completedTasks, priorityTasks) {
  if (totalTasks === 0) return 0;

  const completionWeight = 0.6;
  const priorityWeight = 0.4;

  const completionScore = (completedTasks / totalTasks) * 100;
  const priorityScore = priorityTasks > 0 ? (priorityTasks / totalTasks) * 100 : 0;

  return Math.round(completionScore * completionWeight + priorityScore * priorityWeight);
}
