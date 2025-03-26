import AddNewTask from "@/app/_components/ui/AddNewTask";
import StatCards from "@/app/_components/dashboard/StatCards";
import TodaysTaskList from "@/app/_components/dashboard/TodaysTaskList";
import PageHeader from "@/app/_components/ui/PageHeader";

export const metadata = {
  title: "Dashboard",
  description: "Tasks Overview",
};

export default function DashboardPage() {
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
