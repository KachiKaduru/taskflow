"use server";

import type { CreateEventInput, EventItem } from "@/app/_types";
import { apiClient } from "../apiClient";
import { getBackendToken } from "./authActions";

export async function createEvent(event: CreateEventInput): Promise<void> {
  const token = await getBackendToken();
  if (!token) {
    throw new Error("Backend authentication token not found. Please sign in again.");
  }

  // Map frontend event structure to backend API format
  const eventData = {
    title: event.title,
    description: event.description || null,
    location: event.location || null,
    start_time: event.startTime,
    end_time: event.endTime || null,
    is_virtual: event.isVirtual || false,
    event_type: event.eventType || null,
    duration: event.duration || null,
  };

  await apiClient.createEvent(eventData, token);
}

export async function getEvents(): Promise<EventItem[]> {
  const token = await getBackendToken();
  if (!token) {
    throw new Error("Backend authentication token not found. Please sign in again.");
  }
  const events = await apiClient.getEvents(token);

  // Map backend event structure to frontend format
  return events.map((event: any) => ({
    id: event.id,
    title: event.title,
    description: event.description || null,
    location: event.location || null,
    startTime: event.start_time,
    endTime: event.end_time || null,
    isVirtual: event.is_virtual || false,
    eventType: event.event_type || null,
    duration: event.duration || null,
    createdAt: event.created_at || null,
    updatedAt: event.updated_at || null,
    userId: event.user_id || null,
  })) as EventItem[];
}

export async function updateEvent(eventId: string | number, event: Partial<CreateEventInput>): Promise<void> {
  const token = await getBackendToken();
  if (!token) {
    throw new Error("Backend authentication token not found. Please sign in again.");
  }

  // Map frontend event structure to backend API format
  const eventData: any = {};
  if (event.title !== undefined) eventData.title = event.title;
  if (event.description !== undefined) eventData.description = event.description || null;
  if (event.location !== undefined) eventData.location = event.location || null;
  if (event.startTime !== undefined) eventData.start_time = event.startTime;
  if (event.endTime !== undefined) eventData.end_time = event.endTime || null;
  if (event.isVirtual !== undefined) eventData.is_virtual = event.isVirtual || false;
  if (event.eventType !== undefined) eventData.event_type = event.eventType || null;
  if (event.duration !== undefined) eventData.duration = event.duration || null;

  await apiClient.updateEvent(eventId, eventData, token);
}

export async function deleteEvent(eventId: string | number): Promise<void> {
  const token = await getBackendToken();
  if (!token) {
    throw new Error("Backend authentication token not found. Please sign in again.");
  }

  await apiClient.deleteEvent(eventId, token);
}
