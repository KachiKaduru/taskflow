import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

const PROTECTED_PATHS = ["/dashboard", "/tasks", "/calendar", "/profile", "/settings"];

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // if (PROTECTED_PATHS.some((path) => req.nextUrl.pathname.startsWith(path)) && !session) {
  //   return NextResponse.redirect(
  //     new URL(`/login?from=${encodeURIComponent(req.nextUrl.pathname)}`, req.url)
  //   );
  // }

  return res;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tasks/:path*",
    "/calendar/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
};

// export const config = {
//   matcher: PROTECTED_PATHS.map((path) => `${path}/:path*`),
// };
