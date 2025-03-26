"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import NewTaskModal from "../tasks/NewTaskModal";
import { useState } from "react";
import { useTasks } from "@/app/_contexts/TaskContent";

export default function AddNewTask() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addTask } = useTasks();

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
      >
        <PlusIcon className="h-5 w-5" />
        <span>New Task</span>
      </button>

      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={addTask}
      />
    </div>
  );
}
