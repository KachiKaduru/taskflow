"use server";

import type { CreateTaskInput, TaskItem } from "@/app/_types";
import { auth } from "../auth";
import { supabase } from "../supabase";

export async function createTask(task: CreateTaskInput): Promise<void> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Cannot create task without an authenticated user");
  }

  const { error } = await supabase
    .from("tasks")
    .insert([{ ...task, user_id: session.user.id }])
    .select();

  if (error) {
    console.error(error);
    throw new Error(`Could not create task: ${error.message}`);
  }
}

export async function getTasks(): Promise<TaskItem[]> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Cannot fetch tasks without an authenticated user");
  }

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", session.user.id);

  if (error) {
    console.error(error);
    throw new Error(`Could not fetch tasks: ${error.message}`);
  }

  return (data ?? []) as TaskItem[];
}

