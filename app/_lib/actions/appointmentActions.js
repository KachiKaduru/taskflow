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

export async function getAppointments() {
  const { user } = await auth();
  const { data, error } = await supabase.from("appointments").select("*").eq("user_id", user.id);

  if (error) {
    console.log(error);
    throw new Error("Could not fetch appointments: ", error);
  }

  return data;
}
