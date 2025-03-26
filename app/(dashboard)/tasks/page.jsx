import PageHeader from "@/app/_components/ui/PageHeader";
import AddNewTask from "@/app/_components/ui/AddNewTask";
import TasksFilter from "@/app/_components/tasks/TasksFilter";
import TasksList from "@/app/_components/tasks/TasksList";

export const metadata = {
  title: "Tasks",
};

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="All Tasks">
        <AddNewTask />
      </PageHeader>

      <TasksFilter />

      <TasksList />
    </div>
  );
}
