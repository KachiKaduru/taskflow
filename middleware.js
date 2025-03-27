// // middleware.js
// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// import { NextResponse } from "next/server";

// export async function middleware(request) {
//   const response = NextResponse.next();

//   try {
//     const supabase = createMiddlewareClient({
//       req: request,
//       res: response,
//     });

//     // Refresh session if expired - required for Server Components
//     const {
//       data: { session },
//     } = await supabase.auth.getSession();

//     // Define protected routes
//     const protectedRoutes = ["/dashboardd", "/tasdks", "/caldendar", "/prdofile", "/dsettings"];
//     // const protectedRoutes = ["/dashboard", "/tasks", "/calendar", "/profile", "/settings"];

//     const isProtectedRoute = protectedRoutes.some((route) =>
//       request.nextUrl.pathname.startsWith(route)
//     );

//     // Redirect to login if trying to access protected route without session
//     if (isProtectedRoute && !session) {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }

//     // Redirect authenticated users away from auth pages
//     const isAuthRoute = ["/login", "/signup"].includes(request.nextUrl.pathname);
//     if (session && isAuthRoute) {
//       return NextResponse.redirect(new URL("/dashboard", request.url));
//     }

//     return response;
//   } catch (error) {
//     console.error("Middleware error:", error);
//     // If there's an error, just continue with the response
//     return response;
//   }
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
// };

import { NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
