import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
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
        console.log(credentials, "API_HIT_SUCCESSFULLY USER -> GETTED IN API");
        const decryptedPassword = CryptoJS.AES.decrypt(
          credentials?.password!!,
          process.env.NEXT_PUBLIC_SECRET!!
        ).toString(CryptoJS.enc.Utf8);
        try {
          let apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/v1/doLoginWithMobile`;
          console.log(`${apiUrl} -> HIT_ON_THIS_URL`);
          const requestOptions = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: decryptedPassword,
            }),
          };

          const res = await fetch(apiUrl, requestOptions);
          if (!res.ok) {
            // Network error occurred
            const errorText = await res.text();
            console.error(`Network error: ${res.status} - ${res.statusText}`);
            console.error(errorText); // Log the HTML content returned by the server
            throw new Error(`Network error: ${res.status} - ${res.statusText}`);
          }

          const data = await res.json();
          console.log(data);

          console.log(data);
          if (data.status) {
            cookies().set("token", data.token);
            console.log(data);
            return {
              ...data,
            };
          } else {
            console.log(data.identifer);
            switch (data.identifer) {
              case "NF":
                throw new Error("We can’t find user. Please Sign Up!");
                break;
              case "IU":
                throw new Error(
                  "User is under review. Please wait for Approval"
                );
                break;

              default:
                throw new Error("Please enter correct password");
                break;
            }
          }
        } catch (error: any) {
          console.log(error, { status: false, message: error.message });
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
