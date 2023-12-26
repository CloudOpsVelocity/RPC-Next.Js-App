import { withAuth } from "next-auth/middleware";
import {  NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("token: ", req.nextauth.token);

    // if (req.nextUrl.pathname.startsWith("/") && !req.nextauth.token) {
    //   return NextResponse.rewrite(new URL("/login", req.url));
    // }

    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (req.nextauth.token?.role !== "admin") {
        return NextResponse.rewrite(new URL("/login", req.url));
      }
      //   // Check profile condition
      //   if (req.nextauth.token.profile !== true) {
      //     return NextResponse.rewrite(new URL("/registration", req.url));
      //   }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", ],
};