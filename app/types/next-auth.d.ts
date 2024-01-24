import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userName: string;
      mobile: number;
      name: string;
      email: string;
    };
  }
}
