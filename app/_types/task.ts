export type TaskPriority = "low" | "medium" | "high";

export interface TaskItem {
  id: string | number;
  title: string;
  description?: string | null;
  date?: string | null;
  time?: string | null;
  dueDate?: string | null;
  isCompleted?: boolean;
  isPriority?: boolean;
  isRecurring?: boolean;
  recurrenceDays?: number | null;
  duration?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  eventType?: string | null;
  userId?: string | null;
}

export interface CreateTaskInput
  extends Omit<TaskItem, "id" | "createdAt" | "updatedAt" | "userId"> {
  id: string | number;
}


