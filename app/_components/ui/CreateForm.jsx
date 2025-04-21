"use client";

import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import CreateTask from "../modals/CreateTask";
import CreateEvent from "../modals/CreateEvent";
import CreateAppointment from "../modals/CreateAppointment";

export default function CreateForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [selected, setSelected] = useState("");

  const types = ["task", "event", "appointment"];

  const toggleDropdown = () => {
    setDropdown((d) => !d);
  };

  const openModal = (e) => {
    setSelected(e);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelected("");
    setDropdown(false);
  };

  return (
    <div>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-sm transition-colors cursor-pointer relative"
      >
        <div className="flex gap-1 pr-4">
          <span>Create</span>
          <PlusIcon className="h-5 w-5" />
        </div>

        {dropdown && (
          <ul className="absolute top-11 right-0 bg-white text-left rounded-md border border-[#ccc] z-30">
            {types.map((type, i) => (
              <li
                value={type}
                key={i + 1}
                className="capitalize text-blue-950 hover:bg-blue-600 hover:text-blue-50 pl-2 pr-6 py-1 rounded-md"
                onClick={() => openModal(type)}
              >
                {type}
              </li>
            ))}
          </ul>
        )}
      </button>

      <Modal isOpen={isModalOpen} title={`Add new ${selected}`} onClose={closeModal}>
        {selected === "task" && <CreateTask onClose={closeModal} />}
        {selected === "event" && <CreateEvent onClose={closeModal} />}
        {selected === "appointment" && <CreateAppointment onClose={closeModal} />}
      </Modal>
    </div>
  );
}
