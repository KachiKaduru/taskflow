"use server";

// import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function logout() {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
