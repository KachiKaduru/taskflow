import type { ReactNode } from "react";
import ClientProvider from "../_providers/ClientProvider";
import Header from "../_components/Header";
import Sidebar from "../_components/Sidebar";

import { getTasks } from "../_lib/actions/taskActions";
import { getEvents } from "../_lib/actions/eventActions";
import { getAppointments } from "../_lib/actions/appointmentActions";
import type { TaskItem, EventItem, AppointmentItem } from "../_types";
import { Toaster } from "react-hot-toast";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  // Handle errors gracefully - if API calls fail, use empty arrays
  let tasks: TaskItem[] = [];
  let events: EventItem[] = [];
  let appointments: AppointmentItem[] = [];

  try {
    [tasks, events, appointments] = await Promise.all([
      getTasks().catch((error) => {
        console.error("Error fetching tasks:", error);
        return [];
      }),
      getEvents().catch((error) => {
        console.error("Error fetching events:", error);
        return [];
      }),
      getAppointments().catch((error) => {
        console.error("Error fetching appointments:", error);
        return [];
      }),
    ]);
  } catch (error) {
    console.error("Error in dashboard layout:", error);
    // Continue with empty arrays
  }

  return (
    <ClientProvider fetchedData={{ tasks, events, appointments }}>
      <section className="h-[100dvh] bg-gradient-to-br from-blue-50 to-indigo-50 grid grid-cols-1 grid-rows-[1fr_auto] sm:grid-cols-[auto_1fr] sm:grid-rows-1">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-auto">
          <Header />

          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">{children}</div>
            <Toaster
              position="top-center"
              gutter={12}
              containerClassName="p-2"
              toastOptions={{
                success: { duration: 3000 },
                error: { duration: 4000 },
                style: { fontSize: "16px", maxWidth: "500px" },
              }}
            />
          </main>
        </div>
      </section>
    </ClientProvider>
  );
}
