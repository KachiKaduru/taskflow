"use server";

import { apiClient } from "../apiClient";
import { setServerToken, removeServerToken, getServerToken } from "../auth/token";
import { redirect } from "next/navigation";

// Helper to check if error is a Next.js redirect
function isRedirectError(error: any): boolean {
  return error?.digest?.startsWith("NEXT_REDIRECT");
}

/**
 * Register a new user
 */
export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // Validation
  if (!email || !password || !fullName) {
    return { error: "All fields are required" };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

  try {
    // Register user with backend
    await apiClient.register({
      email,
      password,
      name: fullName,
    });

    // Automatically log them in after signup
    const authResponse = await apiClient.login(email, password);

    // Store token in cookie for server-side access
    await setServerToken(authResponse.access_token);

    // Redirect to dashboard
    redirect("/dashboard");
  } catch (error: any) {
    // Re-throw redirect errors - they're not actual errors!
    if (isRedirectError(error)) {
      throw error;
    }

    console.error("Signup error:", error);
    return {
      error: error.message || "Failed to create account. Email may already be in use.",
    };
  }
}

/**
 * Log in with email and password
 */
export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validation
  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    // Authenticate with backend
    const authResponse = await apiClient.login(email, password);

    // Store token in cookie for server-side access
    await setServerToken(authResponse.access_token);

    // Redirect to dashboard
    redirect("/dashboard");
  } catch (error: any) {
    // Re-throw redirect errors - they're not actual errors!
    if (isRedirectError(error)) {
      throw error;
    }

    console.error("Login error:", error);
    return {
      error: error.message || "Invalid email or password",
    };
  }
}

/**
 * Log out the user
 */
export async function logout() {
  await removeServerToken();
  redirect("/login");
}

/**
 * Get the backend token from cookies (for server-side use)
 */
export async function getBackendToken(): Promise<string | null> {
  return await getServerToken();
}
