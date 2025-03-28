"use client";

import { useState } from "react";
import { GoogleIcon } from "../_icons/icons";
import { useRouter } from "next/navigation";
import { signInWithEmail, signInWithGoogle } from "@/app/auth/actions";
import Spinner from "../ui/Spinner";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailLogin, setIsEmailLogin] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // const handleGoogleSignIn = async () => {
  //   setIsLoading(true);
  //   try {
  //     const { url, error } = await signInWithGoogle();

  //     if (error) {
  //       setError(error);
  //       return;
  //     }

  //     if (url) {
  //       window.location.href = url; // Full page reload for OAuth flow
  //     }
  //   } catch (err) {
  //     setError(err.message || "Google login failed");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");

    try {
      const result = await signInWithGoogle();

      if (result.error) {
        setError(result.error);
        return;
      }

      if (result.url) {
        // Use window.location instead of router for external redirects
        window.location.href = result.url;
      }
    } catch (err) {
      setError(err.message || "Google login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error } = await signInWithEmail({ email, password });

      if (error) {
        setError(error);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
        <div className="p-8">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error === "authentication_failed" && "Authentication failed. Please try again."}
              {error === "server_error" && "Server error occurred. Please try again later."}
              {error === "invalid_request" && "Invalid request. Please try logging in again."}
            </div>
          )}

          <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>

          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:border-gray-400 rounded-lg py-3 px-6 shadow-sm transition-colors mb-4 disabled:opacity-50"
          >
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <GoogleIcon />
                <span>Continue with Google</span>
              </>
            )}
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Email/Password Form */}
          {isEmailLogin ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              {error && <div className="text-red-500 text-sm">{error}</div>}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                  minLength={6}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow-sm transition-colors disabled:opacity-50"
                >
                  {isLoading ? <Spinner /> : "Sign In"}
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
