"use server";

import { createClient } from "@/app/_lib/supabase/client";
const supabase = createClient();

// Email + Password Login
export async function signInWithEmail(formData) {
  //   const supabase = createClient();
  const email = formData.get("email");
  const password = formData.get("password");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

// Email + Password Signup
export async function signUpWithEmail(formData) {
  //   const supabase = createClient();
  const email = formData.get("email");
  const password = formData.get("password");

  const { error } = await supabase.auth.signUp({
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

// Google Login
export async function signInWithGoogle() {
  //   const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { url: data.url }; // This contains the OAuth URL
}

// Logout
export async function signOut() {
  //   const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
