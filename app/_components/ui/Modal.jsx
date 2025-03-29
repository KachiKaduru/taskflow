"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Modal({ children, isOpen, onClose, title = "" }) {
  return (
    <section
      className={`fixed top-0 right-0 w-full h-[100dvh] z-50 backdrop-blur-sm p-5 ${
        isOpen ? "flex justify-center items-center" : "hidden"
      }`}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col gap-1
       bg-white rounded-xl shadow-xl w-full max-w-md max-h-[450px] overflow-y-auto  p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between border-b pb-4">
          <h3 className="text-lg font-semibold">{title}</h3>

          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </header>

        <section className="bg-white">{children}</section>
      </div>
    </section>
  );
}
