import { supabase } from "./supabase";

export async function getUserEmail(email) {
  const { data, error } = await supabase.from("users").select("*").eq("email", email).single();

  return data;
}

export async function createUser(newUser) {
  const { data, error } = await supabase.from("users").insert([newUser]).select();

  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }

  return data;
}
