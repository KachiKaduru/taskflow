"use server";

import type { CreateUserInput, UserRecord } from "@/app/_types";
import { signIn, signOut } from "../auth";
import { supabase } from "../supabase";

export async function signInWithGoogle(): Promise<void> {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function logout(): Promise<void> {
  await signOut({ redirectTo: "/" });
}

export async function getUserEmail(email: string): Promise<UserRecord | null> {
  const { data, error } = await supabase.from("users").select("*").eq("email", email).single();

  if (error && error.code !== "PGRST116") {
    console.error(error);
    throw new Error(`Unable to look up user: ${error.message}`);
  }

  return (data as UserRecord | null) ?? null;
}

export async function createUser(newUser: CreateUserInput): Promise<UserRecord[]> {
  const { data, error } = await supabase.from("users").insert([newUser]).select();

  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }

  return (data as UserRecord[]) ?? [];
}
