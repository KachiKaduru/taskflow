import { NextResponse } from "next/server";
import { auth } from "./app/_lib/auth";

// METHOD ONE
// export function middleware(request) {
//   return NextResponse.redirect(new URL("/login", request.url));
// }

//METHOD TWO
export const middleware = auth;

export const config = {
  // matcher: ["/dashboardd", "/tasksd", "/calendard", "/profiled", "/settingsd"],
  matcher: ["/dashboard", "/tasks", "/calendar", "/profile", "/settings"],
};
