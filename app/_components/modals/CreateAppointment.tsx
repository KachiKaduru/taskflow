"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { AppointmentItem, CreateAppointmentInput } from "@/app/_types";
import { createAppointment } from "@/app/_lib/actions/appointmentActions";
import { createGoogleEvent } from "@/app/_lib/googleCalendar";
import { getCurrentTime, getDate } from "@/app/_lib/helpers";
import FormLabel from "../form/FormLabel";
import SubmitButton from "../ui/SubmitButton";

interface CreateAppointmentProps {
  onClose: () => void;
}

interface CreateAppointmentContext {
  previousAppts: AppointmentItem[];
}

export default function CreateAppointment({ onClose }: CreateAppointmentProps) {
  const currentTime = getCurrentTime();
  const todaysDate = getDate();

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation<
    CreateAppointmentInput,
    Error,
    CreateAppointmentInput,
    CreateAppointmentContext
  >({
    mutationFn: async (newAppointment) => {
      await Promise.all([createAppointment(newAppointment), createGoogleEvent(newAppointment)]);
      return newAppointment;
    },
    onMutate: async (newAppointment) => {
      await queryClient.cancelQueries({ queryKey: ["appointments"] });
      const previousAppts = (queryClient.getQueryData<AppointmentItem[]>(["appointments"]) ?? []).slice();
      queryClient.setQueryData<AppointmentItem[]>(["appointments"], [...previousAppts, newAppointment]);
      onClose();

      return { previousAppts };
    },
    onError: (_error, _newAppointment, context) => {
      if (context?.previousAppts) {
        queryClient.setQueryData(["appointments"], context.previousAppts);
      }
      toast.error("Error creating appointment :(");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onSuccess: () => {
      toast.success("Appointment created!");
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const baseDate = String(formData.get("date"));
    const newAppointment: CreateAppointmentInput = {
      id: Date.now(),
      title: String(formData.get("title")),
      withPerson: formData.get("withPerson")?.toString() ?? null,
      location: formData.get("location")?.toString() ?? null,
      date: `${baseDate}T${formData.get("time")}:00.000Z`,
      duration: Number.parseInt(String(formData.get("duration") ?? "30"), 10),
      preparationTime: Number.parseInt(String(formData.get("preparationTime") ?? "0"), 10),
      notes: formData.get("notes")?.toString() ?? null,
    };

    mutate(newAppointment);
  };

  return (
    <form action={handleSubmit} className="p-2 space-y-4">
      <div>
        <FormLabel>Appointment Title</FormLabel>
        <input name="title" className="w-full p-2 border rounded-lg" required autoFocus />
      </div>

      <div>
        <FormLabel>With (Person/Organization)</FormLabel>
        <input name="withPerson" className="w-full p-2 border rounded-lg" required />
      </div>

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

      <div>
        <FormLabel>Duration (minutes)</FormLabel>
        <select name="duration" className="w-full p-2 border rounded-lg" defaultValue="30">
          <option value="15">15 mins</option>
          <option value="30">30 mins</option>
          <option value="45">45 mins</option>
          <option value="60">1 hour</option>
          <option value="120">2 hours</option>
        </select>
      </div>

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

      <div>
        <FormLabel>Location</FormLabel>
        <input name="location" className="w-full p-2 border rounded-lg" />
      </div>

      <div>
        <FormLabel>Notes</FormLabel>
        <textarea name="notes" rows={2} className="w-full p-2 border rounded-lg" />
      </div>

      <SubmitButton buttonFor="Appointment" color="teal" isLoading={isPending} />
    </form>
  );
}
