import StatCards from "@/app/_components/dashboard/StatCards";
import TodaysTaskList from "@/app/_components/dashboard/TodaysTaskList";
import PageHeader from "@/app/_components/ui/PageHeader";
import CreateNew from "@/app/_components/ui/CreateForm";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return (
    <section className="space-y-8">
      <PageHeader title="Dashboard">
        <CreateNew />
      </PageHeader>

      <StatCards />

      <TodaysTaskList />
    </section>
  );
}
