import CalendarFilter from "@/app/_components/calendar/CalendarFilter";
import PageHeader from "@/app/_components/ui/PageHeader";
import CalendarStats from "@/app/_components/calendar/CalendarStats";
import CalendarTasksList from "@/app/_components/calendar/CalendarTasksList";
import CalendarItem from "@/app/_components/calendar/CalendarItem";

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Calendar">
        <CalendarFilter />
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6">
        <CalendarItem />

        <div className="lg:col-span-1 space-y-6">
          <CalendarStats />

          <CalendarTasksList />
        </div>
      </div>
    </div>
  );
}
