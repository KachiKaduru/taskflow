"use client";

import { useEvents } from "@/app/_contexts/EventContext";
import FormLabel from "../form/FormLabel";
import { getCurrentTime, getDate } from "@/app/_lib/helpers";
import { createGoogleEvent } from "@/app/_lib/googleCalendar";
import { createEvent } from "@/app/_lib/actions/eventActions";

export default function CreateEvent({ onClose }) {
  const { addEvent } = useEvents();
  const currentTime = getCurrentTime();
  const todaysDate = getDate();

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

    try {
      await addEvent(newEvent);
      await createEvent(newEvent);
      await createGoogleEvent(newEvent);
      onClose();
    } catch (error) {
      throw new Error(error);
    }
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

      <button type="submit" className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg mt-4">
        Create Event
      </button>
    </form>
  );
}
