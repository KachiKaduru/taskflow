import Header from "../_components/Header";
import Sidebar from "../_components/Sidebar";
import { CalendarProvider } from "../_contexts/CalendarContext";
import { TaskProvider } from "../_contexts/TaskContent";

// export const metadata = {
//   title: "Dashboard",
//   description: "Tasks Overview",
// };

export default function DashboardLayout({ children }) {
  return (
    <TaskProvider>
      <CalendarProvider>
        <section className="h-[100dvh] bg-gradient-to-br from-blue-50 to-indigo-50 grid grid-cols-1 grid-rows-[1fr_auto] sm:grid-cols-[auto_1fr] sm:grid-rows-1">
          <Sidebar />

          <div className="flex-1 flex flex-col overflow-auto">
            <Header />

            <main className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
          </div>
        </section>
      </CalendarProvider>
    </TaskProvider>
  );
}
