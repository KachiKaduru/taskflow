import ClientProvider from "../_providers/ClientProvider";
import Header from "../_components/Header";
import Sidebar from "../_components/Sidebar";

import { getTasks } from "../_lib/actions/taskActions";
import { getEvents } from "../_lib/actions/eventActions";
import { getAppointments } from "../_lib/actions/appointmentActions";

export default async function DashboardLayout({ children }) {
  const [tasks, events, appointments] = await Promise.all([
    getTasks(),
    getEvents(),
    getAppointments(),
  ]);

  // console.log("1.", tasks, "2.", events, "3.", appointments);

  return (
    <ClientProvider fetchedData={{ tasks, events, appointments }}>
      <section className="h-[100dvh] bg-gradient-to-br from-blue-50 to-indigo-50 grid grid-cols-1 grid-rows-[1fr_auto] sm:grid-cols-[auto_1fr] sm:grid-rows-1">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-auto">
          <Header />

          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </section>
    </ClientProvider>
  );
}
