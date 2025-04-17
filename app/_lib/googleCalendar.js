"use server";

import { google } from "googleapis";
import { auth } from "./auth";

export async function createGoogleEvent(eventData) {
  const session = await auth();
  const calendar = google.calendar({
    version: "v3",
    headers: { Authorization: `Bearer ${session.accessToken}` },
  });

  const event = {
    summary: eventData.title,
    description: eventData.description || eventData.notes || "",
    location: eventData.location || "",
    start: {
      dateTime: eventData.startTime || eventData.date,
      timeZone: "UTC",
    },
    end: {
      dateTime:
        eventData.endTime ||
        new Date(new Date(eventData.date).getTime() + eventData.duration * 60000).toISOString(),
      timeZone: "UTC",
    },
    reminders: {
      useDefault: false,
      overrides: [{ method: "popup", minutes: eventData.preparationTime || 30 }],
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
    });
    return response.data.id;
  } catch (error) {
    console.error("Error creating Google Calendar event:", error);
    return null;
  }
}

export async function createGoogleTask(taskData) {
  const session = await auth();
  const tasks = google.tasks({
    version: "v1",
    headers: { Authorization: `Bearer ${session.accessToken}` },
  });

  try {
    const taskLists = await tasks.tasklists.list();
    const defaultListId = taskLists.data.items?.[0]?.id;

    if (!defaultListId) throw new Error("No task list found");

    const task = {
      title: taskData.title,
      notes: taskData.description || "",
      due: taskData.dueDate,
      status: taskData.isCompleted ? "completed" : "needsAction",
    };

    const response = await tasks.tasks.insert({
      tasklist: defaultListId,
      requestBody: task,
    });
    return response.data.id;
  } catch (error) {
    console.error("Error creating Google Task:", error);
    return null;
  }
}
