"use server";

import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export function createSupabaseServerClient() {
  return createServerClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY, { cookies });
}

export async function getUser() {
  const supabase = createSupabaseServerClient();
  const { data: user } = await supabase.auth.getUser();

  return user;
}
