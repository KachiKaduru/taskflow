"use server";

// import { supabase } from "../supabase/client";
import { supabaseServer } from "../supabase/server";

export async function handleGoogleLogin(origin) {
  const supabase = supabaseServer();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error("Google login error:", error);
    throw error;
  }

  return data.url;
}

export const handleEmailLogin = async (e) => {
  e.preventDefault();

  try {
    await supabase.auth.signInWithPassword({ email, password });
  } catch (error) {
    console.log(error.message);
  }
};

export const handleEmailSignUp = async (e) => {
  e.preventDefault();

  // if (password.length < 6) {
  //   setError("Password must be at least 6 characters");
  //   return;
  // }

  // if (password !== confirmPassword) {
  //   setError("Passwords do not match");
  //   return;
  // }

  // const formData = new FormData(e.currentTarget);
  // const name = formData.get("name");
  // const email = formData.get("email");
  // const password = formData.get("confirmPassword");

  // const { data, error } = await supabase.auth.signUp({
  //   email,
  //   password,
  //   options: {
  //     data: {
  //       name,
  //     },
  //     emailRedirectTo: `${location.origin}/auth/callback`,
  //   },
  // });

  // if (error) {
  //   console.error("Sign up error:", error);
  //   setError(error);
  // }
  // } else {
  //   router.push('/verify-email');
  // }
};

export async function createUser() {
  const { data, error } = await supabase
    .from("users")
    .insert([{ some_column: "someValue", other_column: "otherValue" }])
    .select();
}
