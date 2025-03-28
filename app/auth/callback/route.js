import { createSupabaseServerClient } from "@/app/_lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${requestUrl.origin}/login?error=no_code_provided`);
  }

  try {
    const supabase = createSupabaseServerClient();

    // First verify we have a valid client
    if (!supabase?.auth) {
      throw new Error("Supabase auth not initialized");
    }

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Auth exchange error:", error);
      return NextResponse.redirect(`${requestUrl.origin}/login?error=auth_exchange_failed`);
    }

    return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
  } catch (error) {
    console.error("Callback error:", error);
    return NextResponse.redirect(`${requestUrl.origin}/login?error=server_error`);
  }
}
