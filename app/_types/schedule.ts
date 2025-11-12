import type { AppointmentItem } from "./appointment";
import type { EventItem } from "./event";
import type { TaskItem } from "./task";

export type ScheduleEntityType = "task" | "event" | "appointment";

export type ScheduleItem =
  | (TaskItem & { type: "task" })
  | (EventItem & { type: "event" })
  | (AppointmentItem & { type: "appointment" });

export interface ScheduleFilters {
  date: string;
  month: string;
  type: ScheduleEntityType | "all";
  priority: boolean;
  status: "all" | "completed" | "incomplete";
}

export type CalendarView = "day" | "week" | "month";


