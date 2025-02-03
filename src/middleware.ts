import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("authToken");
  const publicRoutes = ["/", "/login"];
  const isPublicPage = publicRoutes.includes(request.nextUrl.pathname);
  if (!isAuthenticated && !isPublicPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAuthenticated && isPublicPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/login", "/"],
};
