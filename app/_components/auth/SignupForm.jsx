"use client";

import { handleEmailSignUp, handleGoogleLogin } from "@/app/_lib/actions/auth";
import { useState } from "react";
import { GoogleIcon } from "../_icons/icons";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isEmailLogin, setIsEmailLogin] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Welcome to TaskFlow</h1>

          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:border-gray-400 rounded-lg py-3 px-6 shadow-sm transition-colors mb-4"
          >
            <GoogleIcon />
            <span>Sign up with Google</span>
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Email/Password Form */}
          {isEmailLogin ? (
            <form onSubmit={handleEmailSignUp} className="space-y-4">
              {error && <div className="text-red-500 text-sm">{error}</div>}

              <fieldset>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  //   onFocus={setError("")}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 capitalize"
                  required
                />
              </fieldset>

              <fieldset>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  //   onFocus={setError("")}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </fieldset>

              <fieldset>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={6}
                />
              </fieldset>

              <fieldset>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={6}
                />
              </fieldset>

              <fieldset className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleEmailSignUp}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-sm transition-colors"
                >
                  Sign Up
                </button>
              </fieldset>
            </form>
          ) : (
            <button
              onClick={() => setIsEmailLogin(true)}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg shadow-lg transition-colors"
            >
              Sign up with Email
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
