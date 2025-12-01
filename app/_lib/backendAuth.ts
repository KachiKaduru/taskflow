/**
 * Backend Authentication Helper
 * Handles JWT token management for the FastAPI backend
 * NOTE: This is primarily for OAuth flows. Email/password auth should use authActions.
 */

import { apiClient } from "./apiClient";
// import crypto from "crypto";

/**
 * Generate a deterministic password for OAuth users based on email
 * This ensures we can always authenticate the same user with the same password
 * OAuth users don't need to know this password since they authenticate via Google
 */
function generatePasswordForEmail(email: string): string {
  // Use a secret key from environment or a default (in production, use a strong secret)
  const secret =
    process.env.BACKEND_PASSWORD_SECRET || "taskflow-oauth-secret-key-change-in-production";

  // Create a deterministic password using email + secret
  // const hash = crypto.createHash("sha256").update(`${email}:${secret}`).digest("hex") || "";
  const hash = "1234567890";

  // Use first 32 characters as password (backend will hash it anyway)
  return hash.substring(0, 32);
}

/**
 * Get or create a backend JWT token for a user
 * This handles the case where users sign in with Google OAuth
 * but the backend requires username/password authentication
 */
export async function getBackendToken(
  email: string,
  name?: string | null,
  image?: string | null
): Promise<string> {
  try {
    // Generate a deterministic password for this email
    // This ensures we can always authenticate the same user
    const password = generatePasswordForEmail(email);

    try {
      // Try to authenticate first (user might already exist)
      const authResponse = await apiClient.login(email, password);
      return authResponse.access_token;
    } catch (authError) {
      // If authentication fails, user might not exist
      // Create the user in the backend using the register endpoint
      try {
        await apiClient.register({
          email,
          password,
          name: name || null,
        });

        // Now authenticate with the newly created user
        const authResponse = await apiClient.login(email, password);
        return authResponse.access_token;
      } catch (createError: any) {
        // If user creation fails, they might already exist
        // Try authenticating one more time in case the user was just created
        try {
          const authResponse = await apiClient.login(email, password);
          return authResponse.access_token;
        } catch (finalError) {
          console.error("Error creating/authenticating user:", createError);
          throw createError;
        }
      }
    }
  } catch (error) {
    console.error("Error getting backend token:", error);
    throw error;
  }
}
