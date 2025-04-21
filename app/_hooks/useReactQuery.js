"use client";

import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../_lib/actions/taskActions";
import { getEvents } from "../_lib/actions/eventActions";
import { getAppointments } from "../_lib/actions/appointmentActions";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
}

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });
}

export function useAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });
}

export function useCombinedSchedule() {
  const { data: tasks = [] } = useTasks();
  const { data: events = [] } = useEvents();
  const { data: appointments = [] } = useAppointments();

  return useMemo(
    () => [
      ...tasks.map((task) => ({ ...task, type: "task" })),
      ...events.map((event) => ({ ...event, type: "event" })),
      ...appointments.map((appt) => ({ ...appt, type: "appointment" })),
    ],
    [tasks, events, appointments]
  );
}
