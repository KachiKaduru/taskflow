import Link from "next/link";
import { HomeIcon, CalendarIcon, ListBulletIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">TaskFlow</h1>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {[
          { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
          { name: "Tasks", href: "/tasks", icon: ListBulletIcon },
          { name: "Calendar", href: "/calendar", icon: CalendarIcon },
        ].map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group"
          >
            <item.icon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-500" />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="text-sm text-gray-500">© {new Date().getFullYear()} TaskFlow</div>
      </div>
    </div>
  );
}
