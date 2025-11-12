import StatCards from "@/app/_components/dashboard/StatCards";
import PageHeader from "@/app/_components/ui/PageHeader";
import CreateNew from "@/app/_components/ui/CreateForm";
import ScheduleOverview from "@/app/_components/dashboard/ScheduleOverview";
import ProductivityChart from "@/app/_components/ui/ProductivityChart";
import UpcomingEvents from "@/app/_components/ui/UpcomingEvents";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard Overview">
        <CreateNew />
      </PageHeader>

      {/* Top Stats Row */}

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatCards />
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <ScheduleOverview />
        </div>

        <div className=" space-y-6">
          <UpcomingEvents />
        </div>

        <div className="lg:col-span-3">
          <ProductivityChart />
        </div>
      </div>
    </div>
  );
}
