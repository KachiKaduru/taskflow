// import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Login() {
  // const handleGoogleLogin = async () => {
  //   await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //       redirectTo: `${location.origin}/auth/callback`,
  //     },
  //   });
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          TaskFlow
        </Link>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Decorative Header */}
            <div className="h-3 bg-gradient-to-r from-blue-400 to-indigo-500"></div>

            <div className="px-10 py-12">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                <p className="text-gray-600">Sign in to manage your tasks and schedule</p>
              </div>

              {/* Google Login Button */}
              <button
                // onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:border-gray-400 rounded-xl py-3 px-6 shadow-sm transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="font-medium text-gray-700">Continue with Google</span>
              </button>

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <button
                    // onClick={handleGoogleLogin}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign up with Google
                  </button>
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 text-center">
              <p className="text-gray-500 text-sm">
                By continuing, you agree to our{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="container mx-auto px-6 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} TaskFlow. All rights reserved.
      </footer>
    </div>
  );
}
