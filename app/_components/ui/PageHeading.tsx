"use client";

import { usePathname } from "next/navigation";

export default function PageHeading() {
  const pathName = usePathname() ?? "/";
  const heading = pathName === "/" ? "home" : pathName.substring(1);

  return (
    <h2 className="text-xl font-semibold text-gray-800 capitalize hidden sm:block">
      {heading}
    </h2>
  );
}
