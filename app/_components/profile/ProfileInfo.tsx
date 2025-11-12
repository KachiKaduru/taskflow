"use client";

import Image from "next/image";
import { CalendarIcon, ClockIcon, UserCircleIcon } from "@heroicons/react/24/outline";

interface ProfileInfoProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

const defaultProfileMeta = {
  joinDate: "2022",
  timezone: "UTC+1",
};

export default function ProfileInfo({ user }: ProfileInfoProps) {
  const avatarSrc = user.image ?? "/next.svg";

  return (
    <div className="lg:col-span-1 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          {user.image ? (
            <Image
              src={avatarSrc}
              alt="Profile"
              width={96}
              height={96}
              className="h-24 w-24 rounded-full object-cover"
              unoptimized
            />
          ) : (
            <UserCircleIcon className="h-24 w-24 text-gray-400" />
          )}
        </div>

        <h2 className="text-xl font-bold text-center mb-2">{user.name ?? "User"}</h2>

        <div className="text-gray-500 text-sm mb-6">{user.email ?? "No email provided"}</div>

        <div className="w-full space-y-4">
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-gray-700">Member since: {defaultProfileMeta.joinDate}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />

            <span className="text-gray-700">Timezone: {defaultProfileMeta.timezone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
