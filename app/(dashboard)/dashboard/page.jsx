import AddNewTask from "@/app/_components/ui/AddNewTask";
import StatCards from "@/app/_components/dashboard/StatCards";
import TodaysTaskList from "@/app/_components/dashboard/TodaysTaskList";

export default function DashboardPage() {
  return (
    <section className="space-y-8">
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

        <AddNewTask />
      </header>

      <StatCards />

      <TodaysTaskList />
    </section>
  );
}
