"use client";

import { ArrowPathIcon, CogIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SettingsPage() {
  const [passwordResetEmailSent, setPasswordResetEmailSent] = useState(false);

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      </div>

      <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold mb-6 flex items-center">
          <CogIcon className="h-5 w-5 text-blue-500 mr-2" />
          Account Settings
        </h3>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Notification Settings */}
            <div className="border border-gray-100 rounded-lg p-4">
              <h4 className="font-medium mb-4">Notification Preferences</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="text-sm font-medium">Email Notifications</h5>
                    <p className="text-xs text-gray-500">Task reminders and updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h5 className="text-sm font-medium">Push Notifications</h5>
                    <p className="text-xs text-gray-500">Mobile alerts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Password Reset */}
            <div className="border border-gray-100 rounded-lg p-4">
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
          </div>

          {/* Advanced Settings */}
          <div className="border border-gray-100 rounded-lg p-4">
            <h4 className="font-medium mb-4">Advanced</h4>
            <div className="flex justify-between items-center">
              <div>
                <h5 className="text-sm font-medium">Dark Mode</h5>
                <p className="text-xs text-gray-500">Switch interface theme</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="border border-red-100 rounded-lg p-4 bg-red-50">
            <h4 className="font-medium mb-3 text-red-800">Danger Zone</h4>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h5 className="text-sm font-medium text-red-700">Delete Account</h5>
                <p className="text-xs text-red-600">Permanently remove your account and all data</p>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
