"use server";

import { apiClient } from "../api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Sign up a new user with email and password
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
    // Create user in backend
    await apiClient.createUser({
      email,
      name: fullName,
      password,
    });

    // Automatically log them in after signup
    const authResponse = await apiClient.authenticate(email, password);
    const token = authResponse.access_token;

    // Store token in cookie
    cookies().set("backend_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Redirect to dashboard
    redirect("/dashboard");
  } catch (error: any) {
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
    const authResponse = await apiClient.authenticate(email, password);
    const token = authResponse.access_token;

    // Store token in cookie
    cookies().set("backend_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Redirect to dashboard
    redirect("/dashboard");
  } catch (error: any) {
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
  cookies().delete("backend_token");
  redirect("/login");
}

/**
 * Get the backend token from cookies
 */
export async function getBackendToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("backend_token")?.value;
  return token || null;
}
