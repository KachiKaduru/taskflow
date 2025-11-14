"use server";

import type { AppointmentItem, CreateAppointmentInput } from "@/app/_types";
import { apiClient } from "../api";
import { getBackendToken } from "./authActions";

export async function createAppointment(appointment: CreateAppointmentInput): Promise<void> {
  const token = await getBackendToken();
  if (!token) {
    throw new Error("Backend authentication token not found. Please sign in again.");
  }

  // Map frontend appointment structure to backend API format
  const appointmentData = {
    title: appointment.title,
    description: appointment.description || null,
    location: appointment.location || null,
    date: appointment.date,
    time: appointment.time || null,
    duration: appointment.duration || null,
    status: appointment.status || "scheduled",
    attendee: appointment.attendee || null,
    with_person: appointment.withPerson || null,
    notes: appointment.notes || null,
    preparation_time: appointment.preparationTime || null,
  };

  await apiClient.createAppointment(appointmentData, token);
}

export async function getAppointments(): Promise<AppointmentItem[]> {
  const token = await getBackendToken();
  if (!token) {
    throw new Error("Backend authentication token not found. Please sign in again.");
  }
  const appointments = await apiClient.getAppointments(token);

  // Map backend appointment structure to frontend format
  return appointments.map((appointment: any) => ({
    id: appointment.id,
    title: appointment.title,
    description: appointment.description || null,
    location: appointment.location || null,
    date: appointment.date,
    time: appointment.time || null,
    duration: appointment.duration || null,
    status: appointment.status || "scheduled",
    attendee: appointment.attendee || null,
    withPerson: appointment.with_person || null,
    notes: appointment.notes || null,
    preparationTime: appointment.preparation_time || null,
    createdAt: appointment.created_at || null,
    updatedAt: appointment.updated_at || null,
    userId: appointment.user_id || null,
  })) as AppointmentItem[];
}
