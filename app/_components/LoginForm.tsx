"use client";

import Link from "next/link";
import AuthForm from "./AuthForm";

export default function LoginForm() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-8 space-y-3">
          <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>

          <div>
            {/* OAuth commented out - using email/password auth */}
            {/* <GoogleSignInButton />

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-3 text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div> */}

            {/* Email/Password Form */}
            <AuthForm formType="loginForm" />
          </div>

          <p className="text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-700 underline">
              Sign Up Here.{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
