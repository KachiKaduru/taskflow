"use server";

import type { CreateUserInput, UserRecord } from "@/app/_types";
import { apiClient } from "../api";
import { logout as logoutAction, getBackendToken } from "./authActions";

// OAuth functions commented out - using email/password auth now
// export async function signInWithGoogle(): Promise<void> {
//   await signIn("google", { redirectTo: "/dashboard" });
// }

export async function logout(): Promise<void> {
  await logoutAction();
}

export async function getUserEmail(email: string): Promise<UserRecord | null> {
  try {
    const token = await getBackendToken();
    if (!token) {
      // If no token, try to get user by email from backend
      // This might require a custom endpoint or we search through users
      // For now, return null if no token
      return null;
    }

    // Try to get current user from backend
    const currentUser = await apiClient.getCurrentUser(token);

    // If email matches, return the user
    if (currentUser?.email === email) {
      return {
        id: currentUser.id?.toString() || "",
        name: currentUser.name || null,
        email: currentUser.email,
        image: currentUser.image || null,
        createdAt: currentUser.created_at || null,
        updatedAt: currentUser.updated_at || null,
      };
    }

    // If backend has a search endpoint, use it
    // Otherwise, we'll need to get user by ID from session
    return null;
  } catch (error) {
    console.error("Error getting user by email:", error);
    return null;
  }
}

// Note: User creation is now handled by getBackendToken in backendAuth.ts
// This function is kept for backward compatibility but is no longer used in the auth flow
export async function createUser(newUser: CreateUserInput): Promise<UserRecord[]> {
  try {
    // Import the backend auth helper to create user
    const { getBackendToken } = await import("../backendAuth");

    // Get backend token (which will create user if needed)
    const token = await getBackendToken(newUser.email, newUser.name, newUser.image);

    // Get user info from backend
    const backendUser = await apiClient.getCurrentUser(token);

    return [
      {
        id: backendUser.id?.toString() || "",
        name: backendUser.name || null,
        email: backendUser.email,
        image: backendUser.image || null,
        createdAt: backendUser.created_at || null,
        updatedAt: backendUser.updated_at || null,
      },
    ];
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("User could not be created");
  }
}
