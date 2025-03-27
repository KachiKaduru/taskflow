"use server";

// import { supabaseClient } from '@/lib/supabase/client'

export async function loginWithEmail(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
