"use server";

import { auth } from "../auth";
import { supabase } from "../supabase";

export async function createTask(task) {
  const { user } = await auth();

  const { error } = await supabase
    .from("tasks")
    .insert([{ ...task, user_id: user.id }])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Could not create tasks", error);
  }
}

export async function getAllTasks() {
  const { user } = await auth();

  let { data, error } = await supabase.from("tasks").select("*").eq("user_id", user.id);
  if (error) {
    console.log(error);
    throw new Error("Could not fetch tasks", error);
  }

  return data;
}

export async function submitTask(formData) {
  console.log(formData);
}
