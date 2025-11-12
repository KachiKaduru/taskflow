"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { CreateEventInput, EventItem } from "@/app/_types";
import { createEvent } from "@/app/_lib/actions/eventActions";
import { createGoogleEvent } from "@/app/_lib/googleCalendar";
import { getCurrentTime, getDate } from "@/app/_lib/helpers";
import FormLabel from "../form/FormLabel";
import SubmitButton from "../ui/SubmitButton";

interface CreateEventProps {
  onClose: () => void;
}

interface CreateEventContext {
  previousEvents: EventItem[];
}

export default function CreateEvent({ onClose }: CreateEventProps) {
  const currentTime = getCurrentTime();
  const todaysDate = getDate();

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation<CreateEventInput, Error, CreateEventInput, CreateEventContext>({
    mutationFn: async (newEvent) => {
      await Promise.all([createEvent(newEvent), createGoogleEvent(newEvent)]);
      return newEvent;
    },
    onMutate: async (newEvent) => {
      await queryClient.cancelQueries({ queryKey: ["events"] });
      const previousEvents = (queryClient.getQueryData<EventItem[]>(["events"]) ?? []).slice();
      queryClient.setQueryData<EventItem[]>(["events"], [...previousEvents, newEvent]);
      onClose();

      return { previousEvents };
    },
    onError: (_error, _newEvent, context) => {
      if (context?.previousEvents) {
        queryClient.setQueryData(["events"], context.previousEvents);
      }
      toast.error("Error creating event :(");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onSuccess: () => {
      toast.success("Event created!");
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const baseDate = String(formData.get("date"));
    const newEvent: CreateEventInput = {
      id: Date.now(),
      title: String(formData.get("title")),
      description: formData.get("description")?.toString() ?? null,
      location: formData.get("location")?.toString() ?? null,
      startTime: `${baseDate}T${formData.get("startTime")}:00.000Z`,
      endTime: `${baseDate}T${formData.get("endTime")}:00.000Z`,
      isVirtual: formData.get("isVirtual") === "on",
      eventType: formData.get("eventType")?.toString() ?? "other",
    };

    mutate(newEvent);
  };

  return (
    <form action={handleSubmit} className="p-2 space-y-4">
      <fieldset>
        <FormLabel>Event Title</FormLabel>
        <input
          name="title"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
          autoFocus
        />
      </fieldset>

      <fieldset>
        <FormLabel>Description</FormLabel>
        <textarea name="description" rows={3} className="w-full p-2 border rounded-lg" />
      </fieldset>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div>
          <FormLabel>Date</FormLabel>
          <input
            type="date"
            name="date"
            min={todaysDate}
            defaultValue={todaysDate}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <FormLabel>Start Time</FormLabel>
          <input
            type="time"
            name="startTime"
            required
            className="w-full p-2 border rounded-lg"
            defaultValue={currentTime}
          />
        </div>
        <div>
          <FormLabel>End Time</FormLabel>
          <input type="time" name="endTime" required className="w-full p-2 border rounded-lg" />
        </div>
      </div>

      <fieldset>
        <FormLabel>Location</FormLabel>
        <input name="location" className="w-full p-2 border rounded-lg" />
      </fieldset>

      <fieldset>
        <FormLabel>Event Type</FormLabel>
        <select name="eventType" className="w-full p-2 border rounded-lg" defaultValue="meeting">
          <option value="meeting">Meeting</option>
          <option value="reminder">Reminder</option>
          <option value="social">Social</option>
          <option value="other">Other</option>
        </select>
      </fieldset>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="virtual" name="isVirtual" className="h-4 w-4" />
        <label htmlFor="virtual">Virtual Event</label>
      </div>

      <SubmitButton buttonFor="Event" color="purple" isLoading={isPending} />
    </form>
  );
}
