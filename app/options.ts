import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { cookies } from "next/headers";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      // @ts-ignore
      async authorize(credentials) {
        console.log(credentials);
        const res = await axios.post(
          `${process.env.BACKEND_URL}/user/v1/doLoginWithMobile`,
          {
            username: credentials?.username,
            password: credentials?.password,
          }
        );
        console.log(res.data);
        if (res.data.status) {
          // cookies().set("token", res.data.token);
          console.log(res.data);
          return {
            ...res.data,
          };
        } else {
          console.log(res.data);
          throw new Error(res.data.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};
