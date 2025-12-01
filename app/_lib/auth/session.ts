/**
 * Session management using backend JWT tokens
 * Replaces NextAuth session functionality
 */

import { getServerToken } from "./token";
import { apiClient } from "../apiClient";

export type UserSession = {
  user: {
    id: string;
    email: string;
    name: string | null;
    image: string | null;
  } | null;
};

/**
 * Get current user session from backend
 * Returns null if not authenticated
 */
export async function getSession(): Promise<UserSession | null> {
  try {
    const token = await getServerToken();
    
    if (!token) {
      return null;
    }

    // Get user info from backend
    const user = await apiClient.getCurrentUser(token);

    return {
      user: {
        id: user.id?.toString() || "",
        email: user.email || "",
        name: user.name || null,
        image: user.image || null,
      },
    };
  } catch (error) {
    // Token invalid or expired
    console.error("Error getting session:", error);
    return null;
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null && session.user !== null;
}

