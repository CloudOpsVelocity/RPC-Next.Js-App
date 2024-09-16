import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  const token = cookies().get("token")?.value;
  const signUpToken = cookies().get("resume_signup_token")?.value;
  const excludedPath = "/register/builder";
  if (signUpToken && request.nextUrl.pathname !== excludedPath) {
    // Clear only the signup token cookie
    const response = NextResponse.next();
    response.cookies.delete("resume_signup_token");
    return response;
  }
  if (!token) {
    // Clear all authentication related cookies
    const response = NextResponse.next();
    response.cookies.delete("next-auth.session-token");
    response.cookies.delete("next-auth.csrf-token");
    response.cookies.delete("next-auth.callback-url");
    return response;
  }

  // if (!token) {
  //   const response = NextResponse.next();
  //   deleteCookie("next-auth.session-token");
  //   // response.headers.set(
  //   //   "Set-Cookie",
  //   //   `next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
  //   // );
  //   // response.headers.append(
  //   //   "Set-Cookie",
  //   //   `next-auth.callback-url=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
  //   // );
  //   return response;
  // }
  return NextResponse.next({ headers });
}
export const config = {
  matcher: [
    // Exclude specific paths from middleware
    "/((?!api|_next/static|_next/image|favicon.ico|favicons/manifest.json|auth/login.svg|favicons/favicon-32x32.png|android-icon-144x144.png|android-icon-36x36.png|android-icon-48x48.png|android-icon-72x72.png|android-icon-96x96.png|android-icon-192x192.png).*)",
  ],
};
