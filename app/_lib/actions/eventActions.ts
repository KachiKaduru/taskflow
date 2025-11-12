"use server";

import type { CreateEventInput, EventItem } from "@/app/_types";
import { auth } from "../auth";
import { supabase } from "../supabase";

export async function createEvent(event: CreateEventInput): Promise<void> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Cannot create event without an authenticated user");
  }

  const { error } = await supabase
    .from("events")
    .insert([{ ...event, user_id: session.user.id }])
    .select();

  if (error) {
    console.error(error);
    throw new Error(`Could not create event: ${error.message}`);
  }
}

export async function getEvents(): Promise<EventItem[]> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Cannot fetch events without an authenticated user");
  }

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("user_id", session.user.id);

  if (error) {
    console.error(error);
    throw new Error(`Could not fetch events: ${error.message}`);
  }

  return (data ?? []) as EventItem[];
}

