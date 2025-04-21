"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment } from "@/app/_lib/actions/appointmentActions";
import { createGoogleEvent } from "@/app/_lib/googleCalendar";
import { getCurrentTime, getDate } from "@/app/_lib/helpers";

import FormLabel from "../form/FormLabel";
import SubmitButton from "../ui/SubmitButton";

export default function CreateAppointment({ onClose }) {
  const currentTime = getCurrentTime();
  const todaysDate = getDate();

  const queryClient = useQueryClient();

  // const { isPending, mutate } = useMutation({
  //   mutationFn: async (newAppt) => {
  //     await Promise.all([createAppointment(newAppt), createGoogleEvent(newAppt)]);
  //   },
  //   onSuccess: (newAppt) => {
  //     queryClient.invalidateQueries(["appointments"]);
  //     onClose();
  //   },
  //   onError: (error) => {
  //     throw new Error("Error creating appointment: ", error);
  //   },
  // });

  const { isPending, mutate } = useMutation({
    mutationFn: async (newAppt) => {
      await Promise.all([createAppointment(newAppt), createGoogleEvent(newAppt)]);
      return newAppt; // Return the task so we can use it in onSuccess
    },
    // Optimistically update the cache
    onMutate: async (newAppt) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries(["appointments"]);

      // Snapshot the previous value
      const previousAppts = queryClient.getQueryData(["appointments"]) || [];

      // Optimistically update to the new value
      queryClient.setQueryData(["appointments"], [...previousAppts, newAppt]);

      onClose();

      // Return context with the snapshotted value
      return { previousAppts };
    },
    // If the mutation fails, roll back
    onError: (err, newAppt, context) => {
      queryClient.setQueryData(["appointments"], context.previousAppts);
      // Consider showing a toast notification here
      console.error("Error creating appointment: ", err);
    },
    // Always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries(["appointments"]);
    },
    onSuccess: () => {},
  });

  const handleSubmit = async (formData) => {
    const newAppointment = {
      title: formData.get("title"),
      withPerson: formData.get("withPerson"),
      location: formData.get("location"),
      date: `${formData.get("date")}T${formData.get("time")}:00.000Z`,
      duration: parseInt(formData.get("duration")),
      preparationTime: parseInt(formData.get("preparationTime")),
      notes: formData.get("notes"),
      id: Date.now(),
    };

    mutate(newAppointment);
  };

  return (
    <form action={handleSubmit} className="p-2 space-y-4">
      {/* Title */}
      <div>
        <FormLabel>Appointment Title</FormLabel>
        <input name="title" className="w-full p-2 border rounded-lg" required autoFocus />
      </div>

      {/* With */}
      <div>
        <FormLabel>With (Person/Organization)</FormLabel>
        <input name="withPerson" className="w-full p-2 border rounded-lg" required />
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FormLabel>Date</FormLabel>
          <input
            type="date"
            name="date"
            defaultValue={todaysDate}
            min={todaysDate}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <FormLabel>Time</FormLabel>
          <input
            type="time"
            name="time"
            defaultValue={currentTime}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
      </div>

      {/* Duration */}
      <div>
        <FormLabel>Duration (minutes)</FormLabel>
        <select name="duration" className="w-full p-2 border rounded-lg">
          <option value="15">15 mins</option>
          <option value="30">30 mins</option>
          <option value="45">45 mins</option>
          <option value="60">1 hour</option>
          <option value="120">2 hours</option>
        </select>
      </div>

      {/* Preparation Time */}
      <div>
        <FormLabel>Preparation Needed (minutes)</FormLabel>
        <input
          type="number"
          name="preparationTime"
          min="0"
          defaultValue="15"
          className="w-full p-2 border rounded-lg"
        />
      </div>

      {/* Location */}
      <div>
        <FormLabel>Location</FormLabel>
        <input name="location" className="w-full p-2 border rounded-lg" />
      </div>

      {/* Notes */}
      <div>
        <FormLabel>Notes</FormLabel>
        <textarea name="notes" rows={2} className="w-full p-2 border rounded-lg" />
      </div>

      <SubmitButton buttonFor="Appointment" color="teal" isLoading={isPending} />
    </form>
  );
}
