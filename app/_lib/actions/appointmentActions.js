"use server";

import { auth } from "../auth";
import { supabase } from "../supabase";

export async function createAppointment(appt) {
  const { user } = await auth();
  const { error } = await supabase
    .from("appointments")
    .insert([{ ...appt, user_id: user.id }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Could not create appointment: ", error);
  }
}
