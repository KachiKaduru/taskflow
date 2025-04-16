import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser, getUserEmail } from "./actions/userActions";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
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
        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const createdUser = await getUserEmail(session.user.email);
      session.user.id = createdUser.id;

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
