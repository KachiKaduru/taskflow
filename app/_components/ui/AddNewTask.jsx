"use client";

import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import CreateTask from "../modals/CreateTask";

export default function AddNewTask() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
      >
        <PlusIcon className="h-5 w-5" />
        <span>New Task</span>
      </button>

      <Modal isOpen={isModalOpen} title="Add new task" onClose={closeModal}>
        <CreateTask onClose={closeModal} />
      </Modal>
    </div>
  );
}
