import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export function middleware() {
  const token = cookies().get("token")?.value;
  if (!token) {
    const response = NextResponse.next();
    response.headers.set(
      "Set-Cookie",
      `next-auth.session-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    );
    response.headers.append(
      "Set-Cookie",
      `next-auth.callback-url=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    );
    return response;
  }
  return NextResponse.next();
}
export const config = {
  matcher: "/:path*",
};
