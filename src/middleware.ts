// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/_lib/session";

export async function middleware(request: NextRequest) {
  const session = await verifySession();
  const path = request.nextUrl.pathname;

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/dashboard/*"];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(route.replace("*", ""))
  );

  if (isProtectedRoute) {
    // If no session, redirect to login
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      // loginUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(loginUrl);
    }

    // If user is not a seller, redirect to unauthorized page
    if (session.account_type !== "seller") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes the middleware will run on
export const config = {
  matcher: [
    "/dashboard/:path*", // Protect all dashboard routes
  ],
};
