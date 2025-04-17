import { OAuth2Client } from "google-auth-library";

export async function refreshAccessToken(token) {
  const oauth2Client = new OAuth2Client(process.env.AUTH_GOOGLE_ID, process.env.AUTH_GOOGLE_SECRET);

  try {
    oauth2Client.setCredentials({
      refresh_token: token.refreshToken,
    });

    const { credentials } = await oauth2Client.refreshAccessToken();
    return {
      ...token,
      accessToken: credentials.access_token,
      accessTokenExpires: Date.now() + credentials.expiry_date * 1000,
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
