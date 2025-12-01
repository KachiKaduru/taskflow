import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to protect routes
 * Checks for authentication token in cookies
 *
 * This replaces NextAuth middleware with our own backend JWT authentication
 */
export function middleware(request: NextRequest) {
  // Get token from cookies (check both httpOnly and client cookies)
  const token =
    request.cookies.get("taskflow_access_token")?.value ||
    request.cookies.get("taskflow_access_token_client")?.value;

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL("/login", request.url);
    // Preserve the original URL to redirect back after login
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Token exists, allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/schedule", "/calendar", "/profile", "/settings"],
};
