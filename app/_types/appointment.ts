export type AppointmentStatus = "scheduled" | "completed" | "cancelled";

export interface AppointmentItem {
  id: string | number;
  title: string;
  description?: string | null;
  location?: string | null;
  date: string;
  time?: string | null;
  duration?: number | null;
  status?: AppointmentStatus;
  attendee?: string | null;
  withPerson?: string | null;
  notes?: string | null;
  preparationTime?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  userId?: string | null;
}

export interface CreateAppointmentInput
  extends Omit<AppointmentItem, "id" | "createdAt" | "updatedAt" | "userId"> {
  id: string | number;
}


