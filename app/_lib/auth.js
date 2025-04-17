import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUserEmail } from "./actions/userActions";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/tasks",
          access_type: "offline",
          prompt: "consent",
          // prompt: "select_account",
        },
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await getUserEmail(user.email);
        if (!existingUser)
          await createUser({ name: user.name, email: user.email, image: user.image });

        if (account) {
          user.accessToken = account.access_token;
          user.refreshToken = account.refresh_token;
          user.expiresAt = account.expires_at;
          // user.expiresAt = Math.floor(Date.now() / 1000) + (account.expires_in || 3600);
        }
        return true;
      } catch {
        return false;
      }
    },
    async jwt({ token, account, user, trigger, session }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
      }

      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, user, token }) {
      const createdUser = await getUserEmail(session.user.email);
      session.user.id = createdUser.id;

      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.expiresAt = token.expiresAt;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
