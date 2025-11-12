import { OAuth2Client } from "google-auth-library";
import type { JWT } from "next-auth/jwt";

interface ExtendedToken extends JWT {
  accessTokenExpires?: number;
  error?: string;
}

const googleClientId = process.env.AUTH_GOOGLE_ID ?? "";
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET ?? "";

const oauth2Client = new OAuth2Client(googleClientId, googleClientSecret);

export async function refreshAccessToken(token: ExtendedToken): Promise<ExtendedToken> {
  if (!token.refreshToken) {
    throw new Error("No refresh token available to refresh access token");
  }

  try {
    oauth2Client.setCredentials({
      refresh_token: token.refreshToken,
    });

    const { credentials } = await oauth2Client.refreshAccessToken();

    const expiresAt = credentials.expiry_date ?? Date.now() + 3600 * 1000;

    return {
      ...token,
      accessToken: credentials.access_token ?? token.accessToken,
      accessTokenExpires: expiresAt,
      refreshToken: credentials.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
