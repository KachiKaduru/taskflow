"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGoogleEvent } from "@/app/_lib/googleCalendar";
import { createEvent } from "@/app/_lib/actions/eventActions";
import { getCurrentTime, getDate } from "@/app/_lib/helpers";

import FormLabel from "../form/FormLabel";
import SubmitButton from "../ui/SubmitButton";
import toast from "react-hot-toast";

export default function CreateEvent({ onClose }) {
  const currentTime = getCurrentTime();
  const todaysDate = getDate();

  const queryClient = useQueryClient();

  // const { isPending, mutate } = useMutation({
  //   mutationFn: async (newEvent) => {
  //     await Promise.all([createEvent(newEvent), createGoogleEvent(newEvent)]);
  //   },
  //   onSuccess: (newEvent) => {
  //     queryClient.invalidateQueries(["events"]);
  //     onClose();
  //   },
  //   onError: (error) => {
  //     throw new Error("Error creating event: ", error);
  //   },
  // });

  const { isPending, mutate } = useMutation({
    mutationFn: async (newEvent) => {
      await Promise.all([createEvent(newEvent), createGoogleEvent(newEvent)]);
      return newEvent;
    },
    onMutate: async (newEvent) => {
      await queryClient.cancelQueries(["events"]);
      const previousEvents = queryClient.getQueryData(["events"]) || [];
      queryClient.setQueryData(["events"], [...previousEvents, newEvent]);
      onClose();

      return { previousEvents };
    },
    // If the mutation fails, roll back
    onError: (err, newEvent, context) => {
      queryClient.setQueryData(["events"], context.previousEvents);
      toast.error("Error creating event :(");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events"]);
    },
    onSuccess: () => {
      toast.success("Event created!");
    },
  });

  const handleSubmit = async (formData) => {
    const newEvent = {
      title: formData.get("title"),
      description: formData.get("description"),
      location: formData.get("location"),
      startTime: `${formData.get("date")}T${formData.get("startTime")}:00.000Z`,
      endTime: `${formData.get("date")}T${formData.get("endTime")}:00.000Z`,
      isVirtual: formData.get("isVirtual") === "on",
      eventType: formData.get("eventType"),
      id: Date.now(),
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

      {/* Date & Time */}
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

        {/* <div className="grid grid-cols-2 gap-2"> */}
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
      {/* </div> */}

      {/* Location */}
      <fieldset>
        <FormLabel>Location</FormLabel>
        <input name="location" className="w-full p-2 border rounded-lg" />
      </fieldset>

      {/* Event Type */}
      <fieldset>
        <FormLabel>Event Type</FormLabel>
        <select name="eventType" className="w-full p-2 border rounded-lg">
          <option value="meeting">Meeting</option>
          <option value="reminder">Reminder</option>
          <option value="social">Social</option>
          <option value="other">Other</option>
        </select>
      </fieldset>

      {/* Virtual Event */}
      <div className="flex items-center gap-2">
        <input type="checkbox" id="virtual" name="isVirtual" className="h-4 w-4" />
        <label htmlFor="virtual">Virtual Event</label>
      </div>

      <SubmitButton buttonFor="Event" color="purple" isLoading={isPending} />
    </form>
  );
}
