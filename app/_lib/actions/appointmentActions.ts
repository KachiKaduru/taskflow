"use server";

import type { AppointmentItem, CreateAppointmentInput } from "@/app/_types";
import { auth } from "../auth";
import { supabase } from "../supabase";

export async function createAppointment(appointment: CreateAppointmentInput): Promise<void> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Cannot create appointment without an authenticated user");
  }

  const { error } = await supabase
    .from("appointments")
    .insert([{ ...appointment, user_id: session.user.id }])
    .select();

  if (error) {
    console.error(error);
    throw new Error(`Could not create appointment: ${error.message}`);
  }
}

export async function getAppointments(): Promise<AppointmentItem[]> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Cannot fetch appointments without an authenticated user");
  }

  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("user_id", session.user.id);

  if (error) {
    console.error(error);
    throw new Error(`Could not fetch appointments: ${error.message}`);
  }

  return (data ?? []) as AppointmentItem[];
}

