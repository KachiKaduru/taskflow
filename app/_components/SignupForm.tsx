"use client";

import Link from "next/link";
import AuthForm from "./AuthForm";

export default function SignupForm() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-8 space-y-3">
          <h1 className="text-2xl font-bold text-center mb-6">Welcome to TaskFlow</h1>

          <div>
            {/* OAuth commented out - using email/password auth */}
            {/* <GoogleSignInButton type="signup" />

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-3 text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div> */}

            {/* Email/Password Form */}
            <AuthForm formType="signupForm" />
          </div>

          <p className="text-sm">
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
