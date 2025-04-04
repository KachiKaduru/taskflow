"use client";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import NewTaskModal from "../modals/CreateTask";

export default function EditProfile({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <button
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <PencilSquareIcon className="h-5 w-5" />
        <span>Edit Profile</span>
      </button>

      <Modal isOpen={isOpen} title="Add new Task" onClose={onClose}>
        <NewTaskModal isOpen={isOpen} />
      </Modal>
    </>
  );
}
