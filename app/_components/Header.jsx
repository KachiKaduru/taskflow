"use client";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="block sm:hidden">
          <h1 className="text-2xl font-bold text-blue-600">TaskFlow</h1>
        </div>

        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>

        <div className="flex items-center space-x-4">
          <button className="p-1 rounded-full hover:bg-gray-100">
            <UserCircleIcon className="h-8 w-8 text-gray-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
