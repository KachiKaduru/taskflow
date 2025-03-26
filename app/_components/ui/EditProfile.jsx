"use client";

import { CheckCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function EditProfile() {
  const [editMode, setEditMode] = useState(false);

  return (
    <button
      onClick={editMode ? handleSave : () => setEditMode(true)}
      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors"
    >
      {editMode ? (
        <>
          <CheckCircleIcon className="h-5 w-5" />
          <span>Save Changes</span>
        </>
      ) : (
        <>
          <PencilSquareIcon className="h-5 w-5" />
          <span>Edit Profile</span>
        </>
      )}
    </button>
  );
}
