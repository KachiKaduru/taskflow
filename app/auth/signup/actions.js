"use server";

// import { supabaseClient } from "@/lib/supabase/client";

export async function signUpWithEmail(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
