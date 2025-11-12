"use client";

import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppointmentItem, EventItem, TaskItem } from "@/app/_types";
import { CalendarProvider } from "../_contexts/CalendarContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

interface ClientProviderProps {
  children: ReactNode;
  fetchedData?: {
    tasks?: TaskItem[];
    events?: EventItem[];
    appointments?: AppointmentItem[];
  };
}

export default function ClientProvider({ children, fetchedData }: ClientProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <CalendarProvider fetchedData={fetchedData}>{children}</CalendarProvider>
    </QueryClientProvider>
  );
}
