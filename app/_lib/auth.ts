import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getUserEmail } from "./actions/userActions";
import { getBackendToken } from "./backendAuth";
import { apiClient } from "./api";
import type { UserRecord } from "@/app/_types";

type AuthAccount = {
  access_token?: string;
  refresh_token?: string;
  expires_at?: number;
};

type AuthUser = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
};

type AuthSession = {
  user: { id?: string; email?: string | null; name?: string | null; image?: string | null } | null;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
  backendToken?: string; // JWT token from FastAPI backend
};

type AuthToken = {
  id?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
  backendToken?: string; // JWT token from FastAPI backend
};

const googleClientId = process.env.AUTH_GOOGLE_ID ?? "";
const googleClientSecret = process.env.AUTH_GOOGLE_SECRET ?? "";

if (!googleClientId || !googleClientSecret) {
  console.warn("Google OAuth credentials are not fully configured.");
}

const authConfig = {
  providers: [
    Google({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/tasks",
          access_type: "offline",
          prompt: "select_account",
        },
      },
    }),
  ],
  callbacks: {
    authorized({ auth }: { auth: AuthSession | null }) {
      return Boolean(auth?.user);
    },
    async signIn({ user, account }: { user: AuthUser; account?: AuthAccount | null }) {
      if (!user.email) {
        return false;
      }

      try {
        // Get backend JWT token (this will create user if they don't exist)
        // The getBackendToken function handles user creation automatically
        try {
          const backendToken = await getBackendToken(user.email, user.name, user.image);
          user.backendToken = backendToken;

          // Get user info from backend to set user.id
          try {
            const backendUser = await apiClient.getCurrentUser(backendToken);
            if (backendUser?.id) {
              user.id = backendUser.id.toString();
            }
          } catch (userError) {
            console.error("Error getting user info from backend:", userError);
            // Continue without user ID, it will be set in session callback
          }
        } catch (backendError) {
          console.error("Error getting backend token:", backendError);
          // Continue with sign-in even if backend token fails
          // User can still use the app, but API calls might fail
        }

        if (account) {
          user.accessToken = account.access_token;
          user.refreshToken = account.refresh_token;
          user.expiresAt = account.expires_at;
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({
      token,
      account,
      user,
    }: {
      token: AuthToken;
      account?: AuthAccount | null;
      user?: AuthUser | null;
    }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }

      if (user?.id) {
        token.id = user.id;
      }

      if (user?.backendToken) {
        token.backendToken = user.backendToken;
      }

      return token;
    },
    async session({ session, token }: { session: AuthSession; token: AuthToken }) {
      if (session.user?.email) {
        const createdUser = (await getUserEmail(session.user.email)) as UserRecord | null;
        if (createdUser) {
          session.user = { ...session.user, id: createdUser.id };
        }
      }

      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.expiresAt = token.expiresAt;
      session.backendToken = token.backendToken;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

type NextAuthResultShape = {
  auth: (...args: unknown[]) => Promise<AuthSession | null>;
  signIn: (...args: unknown[]) => Promise<unknown>;
  signOut: (...args: unknown[]) => Promise<unknown>;
  handlers: { GET: unknown; POST: unknown };
};

const nextAuth = NextAuth as unknown as (config: typeof authConfig) => NextAuthResultShape;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = nextAuth(authConfig);
