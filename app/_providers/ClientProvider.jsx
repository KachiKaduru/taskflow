"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TaskProvider } from "../_contexts/TaskContext";
import { EventProvider } from "../_contexts/EventContext";
import { AppointmentProvider } from "../_contexts/AppointmentContext";
import { CalendarProvider } from "../_contexts/CalendarContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      // staleTime: 60 * 1000,
    },
  },
});

export default function ClientProvider({ children, initialData }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <TaskProvider>
        <EventProvider>
          <AppointmentProvider>
            <CalendarProvider initialData={initialData}>{children}</CalendarProvider>
          </AppointmentProvider>
        </EventProvider>
      </TaskProvider>
    </QueryClientProvider>
  );
}
