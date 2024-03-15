import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { cookies } from "next/headers";
import CryptoJS from "crypto-js";

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
        const decryptedPassword = CryptoJS.AES.decrypt(
          credentials?.password!!,
          process.env.NEXT_PUBLIC_SECRET!!
        ).toString(CryptoJS.enc.Utf8);

        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/v1/doLoginWithMobile`,
            {
              username: credentials?.username,
              password: decryptedPassword,
            }
          );
          console.log(res.data);
          if (res.data.status) {
            cookies().set("token", res.data.token);
            console.log(res.data);
            return {
              ...res.data,
            };
          } else {
            if (res.data.message === "exception in logging in") {
              throw new Error("Wrong Credentials");
            }
            throw new Error(res.data.message);
          }
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 1000 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 1000 * 24 * 60 * 60,
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
