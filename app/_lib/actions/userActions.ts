"use server";

import type { CreateUserInput, UserRecord } from "@/app/_types";
import { apiClient } from "../apiClient";
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

// Note: User creation should use the register endpoint via authActions.signup()
// This function is kept for backward compatibility (e.g., OAuth flows)
// but the primary registration flow should use /auth/create-user endpoint
export async function createUser(newUser: CreateUserInput): Promise<UserRecord[]> {
  try {
    // Use the register endpoint
    await apiClient.register({
      email: newUser.email,
      password: newUser.password || "temp-password-oauth", // OAuth users may not have password
      name: newUser.name || null,
    });

    // If password was provided, we can get the token and user info
    // Otherwise, this is for OAuth and the user will authenticate separately
    if (newUser.password) {
      const authResponse = await apiClient.login(newUser.email, newUser.password);
      const backendUser = await apiClient.getCurrentUser(authResponse.access_token);

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
    }

    // For OAuth users without password, return minimal user record
    // They'll need to authenticate via OAuth flow
    return [
      {
        id: "",
        name: newUser.name || null,
        email: newUser.email,
        image: newUser.image || null,
        createdAt: null,
        updatedAt: null,
      },
    ];
  } catch (error: any) {
    console.error("Error creating user:", error);
    // If user already exists, try to get their info
    if (error.message?.includes("already exists") || error.message?.includes("409")) {
      const token = await getBackendToken();
      if (token) {
        try {
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
        } catch {
          // Fall through to throw error
        }
      }
    }
    throw new Error("User could not be created");
  }
}
