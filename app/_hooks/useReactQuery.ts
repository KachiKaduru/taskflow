"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../_lib/actions/taskActions";
import { getEvents } from "../_lib/actions/eventActions";
import { getAppointments } from "../_lib/actions/appointmentActions";
import type { AppointmentItem, EventItem, ScheduleItem, TaskItem } from "@/app/_types";

export function useTasks() {
  return useQuery<TaskItem[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
}

export function useEvents() {
  return useQuery<EventItem[]>({
    queryKey: ["events"],
    queryFn: getEvents,
  });
}

export function useAppointments() {
  return useQuery<AppointmentItem[]>({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });
}

export function useCombinedSchedule(): ScheduleItem[] {
  const { data: tasks = [] } = useTasks();
  const { data: events = [] } = useEvents();
  const { data: appointments = [] } = useAppointments();

  return useMemo<ScheduleItem[]>(
    () => [
      ...tasks.map<ScheduleItem>((task) => ({ ...task, type: "task" as const })),
      ...events.map<ScheduleItem>((event) => ({ ...event, type: "event" as const })),
      ...appointments.map<ScheduleItem>((appt) => ({ ...appt, type: "appointment" as const })),
    ],
    [tasks, events, appointments]
  );
}
