import AddNewTask from "@/app/_components/ui/AddNewTask";
import StatCards from "@/app/_components/dashboard/StatCards";
import TodaysTaskList from "@/app/_components/dashboard/TodaysTaskList";
import PageHeader from "@/app/_components/ui/PageHeader";
import { getAllTasks } from "@/app/_lib/actions/taskActions";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return (
    <section className="space-y-8">
      <PageHeader title="Dashboard">
        <AddNewTask />
      </PageHeader>

      <StatCards />

      <TodaysTaskList />
    </section>
  );
}
