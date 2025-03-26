"use client";

import { useState } from "react";
import { CalendarIcon, ClockIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function ProfileInfo() {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    joinDate: "2022",
    timezone: "UTC+1",
    avatar_url: "",
  });

  return (
    <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          {userData.avatar_url ? (
            <img
              src={userData.avatar_url}
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <UserCircleIcon className="h-24 w-24 text-gray-400" />
          )}
        </div>

        <h2 className="text-xl font-bold text-center mb-2">{userData.name}</h2>

        <div className="text-gray-500 text-sm mb-6">{userData.email}</div>

        <div className="w-full space-y-4">
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-gray-700">Member since: {userData.joinDate}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />

            <span className="text-gray-700">Timezone: {userData.timezone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
