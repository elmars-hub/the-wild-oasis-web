import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },

    async signIn({ user }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest) {
          await createGuest({
            email: user.email,
            fullName: user.name || "",
          });
        }

        return true;
      } catch (err) {
        console.error("❌ Error in signIn callback:", err);
        return false;
      }
    },

    async session({ session, user }) {
      const guest = await getGuest(session.user.email);

      session.user.guestId = guest;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

const nextAuth = NextAuth(authConfig);

export const { auth, signIn, signOut } = nextAuth;
export const handlers = nextAuth.handlers;
