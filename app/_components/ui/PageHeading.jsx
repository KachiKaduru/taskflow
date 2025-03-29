"use client";

import { usePathname } from "next/navigation";

export default function PageHeading() {
  const pathName = usePathname();

  return (
    <h2 className="text-xl font-semibold text-gray-800 capitalize hidden sm:block">
      {pathName.substring(1)}
    </h2>
  );
}
