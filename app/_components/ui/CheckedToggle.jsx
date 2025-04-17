"use client";

import { useState } from "react";

export default function CheckedToggle() {
  const [isChecked, setIsChecked] = useState(false);

  const toggleChecked = () => {
    setIsChecked((c) => !c);
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        defaultChecked={isChecked}
        value={isChecked}
      />
      <div
        onClick={toggleChecked}
        className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
      ></div>
    </label>
  );
}
