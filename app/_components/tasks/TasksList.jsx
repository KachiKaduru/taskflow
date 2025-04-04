"use client";

import { useTasks } from "@/app/_contexts/TaskContext";
import { FunnelIcon } from "@heroicons/react/24/outline";
import TaskCard from "../_tasks/TaskCard";

export default function TasksList() {
  const { filteredTasks, toggleTaskCompletion } = useTasks();

  return (
    <section className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      {filteredTasks.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onToggleComplete={toggleTaskCompletion} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-gray-400">
          <FunnelIcon className="h-12 w-12 mx-auto mb-2" />
          <p>No tasks match your filters</p>
        </div>
      )}
    </section>
  );
}
