"use server";

import { auth } from "../auth";
import { supabase } from "../supabase";

export async function createEvent(event) {
  const { user } = await auth();
  const { error } = await supabase
    .from("events")
    .insert([{ ...event, user_id: user.id }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Could not create event: ", error);
  }
}
