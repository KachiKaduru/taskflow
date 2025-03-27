// app/auth/callback/route.js
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/dashboard";

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.exchangeCodeForSession(code);

    if (session?.user) {
      // Check if user exists in users table
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("id")
        .eq("auth_id", session.user.id)
        .maybeSingle();

      // If user doesn't exist, create profile
      if (!existingUser && !fetchError) {
        const { error: insertError } = await supabase.from("users").insert({
          auth_id: session.user.id,
          email: session.user.email,
          name:
            session.user.user_metadata?.full_name || session.user.email.split("@")[0] || "New User",
          profile_image: session.user.user_metadata?.avatar_url || null,
        });

        if (insertError) {
          console.error("Error creating user profile:", insertError);
        }
      }
    }
  }

  return NextResponse.redirect(requestUrl.origin + next);
}
