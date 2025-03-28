"use client";

import { useState } from "react";
import { GoogleIcon } from "./_icons/icons";
import GoogleSignInButton from "./ui/GoogleSignInButton";
import Link from "next/link";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

export default function SignupForm() {
  const [isEmailLogin, setIsEmailLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-8 space-y-3">
          <h1 className="text-2xl font-bold text-center mb-6">Welcome to TaskFlow</h1>

          <div>
            <GoogleSignInButton type="signup" />

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-3 text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Email/Password Form */}
            {isEmailLogin ? (
              <form className="space-y-4">
                <fieldset>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 capitalize"
                    required
                  />
                </fieldset>

                <fieldset>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </fieldset>

                <fieldset>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
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
                    name="confirmPassword"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                    minLength={6}
                  />
                </fieldset>

                <fieldset className="flex gap-2 pt-2">
                  <button
                    type="button"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-sm transition-colors"
                  >
                    Sign Up
                  </button>
                </fieldset>
              </form>
            ) : (
              <button
                onClick={() => setIsEmailLogin(true)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg shadow-lg transition-colors flex justify-center gap-5"
              >
                <EnvelopeIcon className="w-6 h-6" />
                <span>Sign up with Email</span>
              </button>
            )}
          </div>

          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-700 underline">
              Login Here.{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
