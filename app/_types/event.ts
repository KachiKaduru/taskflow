export type EventCategory = "meeting" | "reminder" | "social" | "other";

export interface EventItem {
  id: string | number;
  title: string;
  description?: string | null;
  location?: string | null;
  startTime: string;
  endTime?: string | null;
  isVirtual?: boolean;
  eventType?: EventCategory | string | null;
  duration?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  userId?: string | null;
}

export interface CreateEventInput
  extends Omit<EventItem, "id" | "createdAt" | "updatedAt" | "userId"> {
  id: string | number;
}
