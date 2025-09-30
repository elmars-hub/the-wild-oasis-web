import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
  },
};

const nextAuth = NextAuth(authConfig);

export const { auth } = nextAuth;
export const handlers = nextAuth.handlers;
