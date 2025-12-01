"use server";

import { google } from "googleapis";
import type { CreateAppointmentInput, CreateEventInput, CreateTaskInput } from "@/app/_types";
import { getSession } from "./auth/session";

// Note: Google Calendar integration requires OAuth tokens
// Since we removed NextAuth, this feature may not work unless OAuth is re-implemented
// For now, these functions will fail gracefully and return null

type CalendarExportInput = CreateEventInput | CreateAppointmentInput;

const resolveStartDate = (data: CalendarExportInput): string => {
  if ("startTime" in data && data.startTime) {
    return data.startTime;
  }

  if ("date" in data && data.date) {
    return data.date;
  }

  return new Date().toISOString();
};

const resolveEndDate = (data: CalendarExportInput): string => {
  if ("endTime" in data && data.endTime) {
    return data.endTime;
  }

  if ("date" in data && "duration" in data && data.date && data.duration != null) {
    const baseDate = new Date(data.date);
    if (!Number.isNaN(baseDate.getTime())) {
      return new Date(baseDate.getTime() + data.duration * 60000).toISOString();
    }
  }

  if ("startTime" in data && data.startTime) {
    return data.startTime;
  }

  if ("date" in data && data.date) {
    return data.date;
  }

  return new Date().toISOString();
};

const resolvePreparationMinutes = (data: CalendarExportInput): number => {
  if ("preparationTime" in data && typeof data.preparationTime === "number") {
    return data.preparationTime;
  }
  return 30;
};

const resolveDescription = (data: CalendarExportInput): string => {
  if ("description" in data && data.description) {
    return data.description;
  }
  if ("notes" in data && data.notes) {
    return data.notes;
  }
  return "";
};

export async function createGoogleEvent(eventData: CalendarExportInput): Promise<string | null> {
  // Google Calendar integration requires OAuth tokens
  // Since we removed NextAuth, this feature is temporarily disabled
  // Return null to fail gracefully - the main backend creation will still work
  console.warn("Google Calendar integration is disabled. OAuth tokens are not available.");
  return null;
  
  /* TODO: Re-implement OAuth flow if Google Calendar sync is needed
  const session = await getSession();
  if (!session?.accessToken) {
    return null; // Fail gracefully instead of throwing
  }

  const calendar = google.calendar({
    version: "v3",
    headers: { Authorization: `Bearer ${session.accessToken}` },
  });

  const startDateTime = resolveStartDate(eventData);
  const computedEnd = resolveEndDate(eventData);

  const description = resolveDescription(eventData);
  const preparationMinutes = resolvePreparationMinutes(eventData);

  const event = {
    summary: eventData.title,
    description,
    location: eventData.location ?? "",
    start: {
      dateTime: startDateTime,
      timeZone: "UTC",
    },
    end: {
      dateTime: computedEnd,
      timeZone: "UTC",
    },
    reminders: {
      useDefault: false,
      overrides: [
        {
          method: "popup" as const,
          minutes: preparationMinutes,
        },
      ],
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });
    return response.data.id ?? null;
  } catch (error) {
    console.error("Error creating Google Calendar event:", error);
    return null;
  }
  */
}

export async function createGoogleTask(taskData: CreateTaskInput): Promise<string | null> {
  // Google Tasks integration requires OAuth tokens
  // Since we removed NextAuth, this feature is temporarily disabled
  // Return null to fail gracefully - the main backend creation will still work
  console.warn("Google Tasks integration is disabled. OAuth tokens are not available.");
  return null;
  
  /* TODO: Re-implement OAuth flow if Google Tasks sync is needed
  const session = await getSession();
  if (!session?.accessToken) {
    return null; // Fail gracefully instead of throwing
  }

  const tasks = google.tasks({
    version: "v1",
    headers: { Authorization: `Bearer ${session.accessToken}` },
  });

  try {
    const taskLists = await tasks.tasklists.list();
    const defaultListId = taskLists.data.items?.[0]?.id;

    if (!defaultListId) {
      throw new Error("No task list found");
    }

    const task = {
      title: taskData.title,
      notes: taskData.description ?? "",
      due: taskData.dueDate ?? undefined,
      status: taskData.isCompleted ? "completed" : "needsAction",
    };

    const response = await tasks.tasks.insert({
      tasklist: defaultListId,
      requestBody: task,
    });
    return response.data.id ?? null;
  } catch (error) {
    console.error("Error creating Google Task:", error);
    return null;
  }
  */
}
