"use server";

import type { CreateTaskInput, TaskItem } from "@/app/_types";
import { apiClient } from "../apiClient";
import { getBackendToken } from "./authActions";

export async function createTask(task: CreateTaskInput): Promise<void> {
  const token = await getBackendToken();
  if (!token) {
    throw new Error("Backend authentication token not found. Please sign in again.");
  }

  // Map frontend task structure to backend API format
  const taskData = {
    title: task.title,
    description: task.description || null,
    due_date: task.dueDate || null,
    priority: task.isPriority ? "high" : "medium",
    is_completed: task.isCompleted || false,
    is_recurring: task.isRecurring || false,
    recurrence_days: task.recurrenceDays || null,
    // Add other fields as needed based on backend schema
  };

  await apiClient.createTask(taskData, token);
}

export async function getTasks(): Promise<TaskItem[]> {
  const token = await getBackendToken();
  if (!token) {
    throw new Error("Backend authentication token not found. Please sign in again.");
  }
  const tasks = await apiClient.getTasks(token);

  // Map backend task structure to frontend format
  return tasks.map((task: any) => ({
    id: task.id,
    title: task.title,
    description: task.description || null,
    dueDate: task.due_date || null,
    isCompleted: task.is_completed || false,
    isPriority: task.priority === "high",
    isRecurring: task.is_recurring || false,
    recurrenceDays: task.recurrence_days || null,
    createdAt: task.created_at || null,
    updatedAt: task.updated_at || null,
    userId: task.user_id || null,
  })) as TaskItem[];
}

export async function updateTask(
  taskId: string | number,
  task: Partial<CreateTaskInput>
): Promise<void> {
  const token = await getBackendToken();
  if (!token) {
    throw new Error("Backend authentication token not found. Please sign in again.");
  }

  // Map frontend task structure to backend API format
  const taskData: any = {};
  if (task.title !== undefined) taskData.title = task.title;
  if (task.description !== undefined) taskData.description = task.description || null;
  if (task.dueDate !== undefined) taskData.due_date = task.dueDate || null;
  if (task.isPriority !== undefined) taskData.priority = task.isPriority ? "high" : "medium";
  if (task.isCompleted !== undefined) taskData.is_completed = task.isCompleted || false;
  if (task.isRecurring !== undefined) taskData.is_recurring = task.isRecurring || false;
  if (task.recurrenceDays !== undefined) taskData.recurrence_days = task.recurrenceDays || null;

  await apiClient.updateTask(taskId, taskData, token);
}

export async function deleteTask(taskId: string | number): Promise<void> {
  const token = await getBackendToken();
  if (!token) {
    throw new Error("Backend authentication token not found. Please sign in again.");
  }

  await apiClient.deleteTask(taskId, token);
}
