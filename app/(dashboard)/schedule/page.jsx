import ScheduleFilter from "@/app/_components/schedule/ScheduleFilter";
import ScheduleList from "@/app/_components/schedule/ScheduleList";
import CreateForm from "@/app/_components/ui/CreateForm";
import PageHeader from "@/app/_components/ui/PageHeader";

export const metadata = {
  title: "Schedule",
};

export default function SchedulePage() {
  return (
    <section className="space-y-3">
      <PageHeader title="Schedule List">
        <CreateForm />
      </PageHeader>

      <ScheduleFilter />

      <ScheduleList />
    </section>
  );
}
