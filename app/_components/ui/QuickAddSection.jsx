"use client";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function QuickAddSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <PlusIcon className="h-5 w-5 text-gray-500" />
          Quick Add
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 divide-x divide-y sm:divide-y-0 border-gray-200">
        <Link href="/tasks/create" className="p-4 text-center hover:bg-gray-50 transition-colors">
          <div className="mx-auto w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
            <PlusIcon className="h-5 w-5 text-blue-600" />
          </div>
          <span className="text-sm font-medium">Task</span>
        </Link>

        <Link href="/events/create" className="p-4 text-center hover:bg-gray-50 transition-colors">
          <div className="mx-auto w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
            <PlusIcon className="h-5 w-5 text-purple-600" />
          </div>
          <span className="text-sm font-medium">Event</span>
        </Link>

        <Link
          href="/appointments/create"
          className="p-4 text-center hover:bg-gray-50 transition-colors"
        >
          <div className="mx-auto w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-2">
            <PlusIcon className="h-5 w-5 text-teal-600" />
          </div>
          <span className="text-sm font-medium">Appointment</span>
        </Link>
      </div>
    </div>
  );
}
