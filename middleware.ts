import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  const token = cookies().get("token")?.value;
  const response = NextResponse.next();
  const signUpTokenA = cookies().get("resume_signup_tokena")?.value;
  const signUpTokenB = cookies().get("resume_signup_tokenb")?.value;

  const excludedPathAgent = "/register/agent";
  const excludedPathBuilder = "/register/builder";
  console.log(excludedPathBuilder);
  if (signUpTokenA && request.nextUrl.pathname !== excludedPathAgent) {
    response.cookies.delete("resume_signup_tokena");
    return response;
  }
  if (signUpTokenB && request.nextUrl.pathname !== excludedPathBuilder) {
    console.log(
      "signUp token deleted",
      signUpTokenB,
      `pathname=${request.nextUrl.pathname}`,
      signUpTokenB && request.nextUrl.pathname !== excludedPathBuilder
    );
    response.cookies.delete("resume_signup_tokenb");
    return response;
  }
  if (!token) {
    response.cookies.delete("next-auth.session-token");
    response.cookies.delete("next-auth.csrf-token");
    response.cookies.delete("next-auth.callback-url");
    return response;
  }
  return NextResponse.next({ headers });
}
export const config = {
  matcher: [
    // Exclude specific paths from middleware
    "/((?!api|_next/static|_next/image|favicon.ico|favicons/manifest.json|auth/login.svg|favicons/favicon-32x32.png|android-icon-144x144.png|android-icon-36x36.png|android-icon-48x48.png|android-icon-72x72.png|android-icon-96x96.png|android-icon-192x192.png|/).*)",
  ],
};
