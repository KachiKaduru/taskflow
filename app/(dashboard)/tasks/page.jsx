import PageHeader from "@/app/_components/ui/PageHeader";
import TasksFilter from "@/app/_components/tasks/TasksFilter";
import TasksList from "@/app/_components/tasks/TasksList";
import CreateForm from "@/app/_components/ui/CreateForm";

export const metadata = {
  title: "Tasks",
};

export default function TasksPage() {
  return (
    <section className="space-y-6">
      <PageHeader title="All Tasks">
        <CreateForm />
      </PageHeader>

      <TasksFilter />

      <TasksList />
    </section>
  );
}
