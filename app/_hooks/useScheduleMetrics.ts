"use client";

import { useMemo } from "react";
import type { ScheduleItem } from "@/app/_types";
import { useCalendar } from "../_contexts/CalendarContext";

export interface ScheduleMetrics {
  allItems: ScheduleItem[];
  tasks: ScheduleItem[];
  events: ScheduleItem[];
  appointments: ScheduleItem[];
  totalItems: number;
  taskCount: number;
  eventCount: number;
  appointmentCount: number;
  completedTasks: number;
  priorityTasks: number;
  taskCompletionRate: number;
  taskPriorityRatio: number;
  timeAllocation: number;
  productivityScore: number;
  byType: Record<"task" | "event" | "appointment", ScheduleItem[]>;
}

export function useScheduleMetrics(): ScheduleMetrics {
  const { date, view, scheduleItems } = useCalendar();

  return useMemo<ScheduleMetrics>(() => {
    const resolvePrimaryDate = (item: ScheduleItem): Date | null => {
      if (item.type === "task") {
        const source = item.dueDate ?? item.date ?? null;
        return source ? new Date(source) : null;
      }
      if (item.type === "event") {
        return item.startTime ? new Date(item.startTime) : null;
      }
      return item.date ? new Date(item.date) : null;
    };

    const resolveComparableDate = (item: ScheduleItem): Date | null => {
      const primary = resolvePrimaryDate(item);
      if (primary) return primary;
      if (item.type === "event" && item.endTime) {
        return new Date(item.endTime);
      }
      if (item.type === "task" && item.createdAt) {
        return new Date(item.createdAt);
      }
      return null;
    };

    const filteredItems = scheduleItems.filter((item) => {
      const itemDate = resolvePrimaryDate(item);

      if (!itemDate) {
        return false;
      }

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

      return (
        itemDate.getMonth() === date.getMonth() && itemDate.getFullYear() === date.getFullYear()
      );
    });

    const sortedItems = [...filteredItems].sort((a, b) => {
      const dateA = resolveComparableDate(a);
      const dateB = resolveComparableDate(b);
      if (!dateA || !dateB) return 0;
      return dateA.getTime() - dateB.getTime();
    });

    const taskItems = sortedItems.filter((item) => item.type === "task");
    const completedTasks = taskItems.filter((task) => task.isCompleted).length;
    const priorityTasks = taskItems.filter((task) => task.isPriority).length;
    const taskCompletionRate =
      taskItems.length > 0 ? Math.round((completedTasks / taskItems.length) * 100) : 0;

    const events = sortedItems.filter((item) => item.type === "event");
    const appointments = sortedItems.filter((item) => item.type === "appointment");

    const totalDuration = sortedItems.reduce((total, item) => total + (item.duration ?? 0), 0);

    return {
      allItems: sortedItems,
      tasks: taskItems,
      events,
      appointments,
      totalItems: sortedItems.length,
      taskCount: taskItems.length,
      eventCount: events.length,
      appointmentCount: appointments.length,
      completedTasks,
      priorityTasks,
      taskCompletionRate,
      taskPriorityRatio:
        taskItems.length > 0 ? Math.round((priorityTasks / taskItems.length) * 100) : 0,
      timeAllocation: totalDuration,
      productivityScore: calculateProductivityScore(
        taskItems.length,
        completedTasks,
        priorityTasks
      ),
      byType: {
        task: taskItems,
        event: events,
        appointment: appointments,
      },
    };
  }, [date, view, scheduleItems]);
}

function calculateProductivityScore(
  totalTasks: number,
  completedTasks: number,
  priorityTasks: number
): number {
  if (totalTasks === 0) return 0;

  const completionWeight = 0.6;
  const priorityWeight = 0.4;

  const completionScore = (completedTasks / totalTasks) * 100;
  const priorityScore = priorityTasks > 0 ? (priorityTasks / totalTasks) * 100 : 0;

  return Math.round(completionScore * completionWeight + priorityScore * priorityWeight);
}
