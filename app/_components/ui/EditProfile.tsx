"use client";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import CreateTask from "../modals/CreateTask";

export default function EditProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <PencilSquareIcon className="h-5 w-5" />
        <span>Edit Profile</span>
      </button>

      <Modal isOpen={isOpen} title="Add new Task" onClose={handleClose}>
        <CreateTask onClose={handleClose} />
      </Modal>
    </>
  );
}
