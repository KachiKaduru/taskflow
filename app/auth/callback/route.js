import { createSupabaseServerClient } from "@/app/_lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createSupabaseServerClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Redirect to dashboard after successful auth
  return NextResponse.redirect(requestUrl.origin + "/dashboard");
}
