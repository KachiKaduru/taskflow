"use client";

import { useState } from "react";
import { GoogleIcon } from "./_icons/icons";

export default function LoginForm() {
  const [isEmailLogin, setIsEmailLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>

          <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:border-gray-400 rounded-lg py-3 px-6 shadow-sm transition-colors mb-4 disabled:opacity-50">
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Email/Password Form */}
          {isEmailLogin ? (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={6}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-sm transition-colors disabled:opacity-50"
                >
                  Sign In
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsEmailLogin(true)}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg shadow-sm transition-colors"
            >
              Continue with Email
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
