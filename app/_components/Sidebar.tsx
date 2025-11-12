"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { HomeIcon, CalendarIcon, UserIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { QueueListIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
  const pathname = usePathname();

  const sidebarMenu = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Schedule", href: "/schedule", icon: QueueListIcon },
    { name: "Calendar", href: "/calendar", icon: CalendarIcon },
    { name: "Profile", href: "/profile", icon: UserIcon },
    { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
  ];

  return (
    <div className="row-start-2 row-end-3 sm:row-start-1 sm:row-end-1 w-full sm:w-60 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 hidden sm:block">
        <h1 className="text-2xl font-bold text-blue-600">TaskFlow</h1>
      </div>

      <nav className="flex-1 px-1 space-y-1 flex justify-between sm:justify-normal sm:flex-col">
        {sidebarMenu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col sm:flex-row items-center px-2 sm:px-4 py-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors group ${
              pathname === item.href ? "bg-blue-50 text-blue-600" : "text-gray-700 "
            }`}
          >
            <item.icon
              className={`h-5 w-5 mx-auto sm:mr-3 sm:mx-0 ${
                pathname === item.href ? "text-blue-600" : "text-gray-400"
              } group-hover:text-blue-500 `}
            />
            <span className="font-medium text-xs sm:text-base">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 hidden sm:block">
        <div className="text-sm text-gray-500">© {new Date().getFullYear()} TaskFlow</div>
      </div>
    </div>
  );
}
