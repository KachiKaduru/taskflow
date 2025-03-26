"use client";

import { useState } from "react";
import { ArrowPathIcon, LockClosedIcon } from "@heroicons/react/24/outline";

export default function PasswordSettings() {
  const [passwordResetEmailSent, setPasswordResetEmailSent] = useState(false);

  return (
    <div className="border bg-white border-gray-100 rounded-lg p-4">
      <h4 className="font-medium mb-4">Security</h4>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <LockClosedIcon className="h-5 w-5 text-gray-400" />
          <div>
            <h5 className="text-sm font-medium">Password</h5>
            <p className="text-xs text-gray-500">Last changed 3 months ago</p>
          </div>
        </div>
        <button
          // onClick={handlePasswordReset}
          className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
          disabled={passwordResetEmailSent}
        >
          {passwordResetEmailSent ? (
            "Email Sent! Check Your Inbox"
          ) : (
            <>
              <ArrowPathIcon className="h-4 w-4" />
              Reset Password
            </>
          )}
        </button>
      </div>
    </div>
  );
}
