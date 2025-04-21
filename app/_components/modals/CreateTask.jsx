"use client";

import { useState } from "react";
import FormLabel from "../form/FormLabel";
import { getCurrentTime } from "@/app/_lib/helpers";
import { createGoogleTask } from "@/app/_lib/googleCalendar";
import { createTask } from "@/app/_lib/actions/taskActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SubmitButton from "../ui/SubmitButton";
import toast from "react-hot-toast";

export default function CreateTask({ onClose }) {
  const queryClient = useQueryClient();
  const [isRecurring, setIsRecurring] = useState(false);

  // const { isPending, mutate } = useMutation({
  //   mutationFn: async (newTask) => {
  //     await Promise.all([createTask(newTask), createGoogleTask(newTask)]);
  //   },
  //   onSuccess: (newTask) => {
  //     queryClient.invalidateQueries(["tasks"]);
  //     onClose();
  //     setIsRecurring(false);
  //   },
  //   onError: (error) => {
  //     throw new Error("Error creating task: ", error);
  //   },
  // });

  const { isPending, mutate } = useMutation({
    mutationFn: async (newTask) => {
      await Promise.all([createTask(newTask), createGoogleTask(newTask)]);
      return newTask;
    },
    onMutate: async (newTask) => {
      await queryClient.cancelQueries(["tasks"]);
      const previousTasks = queryClient.getQueryData(["tasks"]) || [];
      queryClient.setQueryData(["tasks"], [...previousTasks, newTask]);
      onClose();

      return { previousTasks };
    },
    // If the mutation fails, roll back
    onError: (err, newTask, context) => {
      queryClient.setQueryData(["tasks"], context.previousTasks);
      toast.error("Error creating task :(");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
    onSuccess: () => {
      toast.success("Task created!");
      setIsRecurring(false);
    },
  });

  const handleSubmit = async (formData) => {
    const newTask = {
      id: Date.now(),
      title: formData.get("title"),
      time: formData.get("time"),
      date: formData.get("date"),
      dueDate: `${formData.get("date")}T${formData.get("time")}:00.000Z`,
      isCompleted: false,
      isPriority: formData.get("isPriority") === "on",
      isRecurring: formData.get("isRecurring") === "on",
      recurrenceDays: parseInt(formData.get("recurrenceDays")) || 1,
    };

    mutate(newTask);
  };

  return (
    <form action={handleSubmit} className="p-2 space-y-4">
      <div>
        <FormLabel>Title</FormLabel>
        <input name="title" className="w-full p-2 border rounded-lg" required autoFocus />
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FormLabel>Due Date</FormLabel>
          <input
            type="date"
            name="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            min={new Date().toISOString().split("T")[0]}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <FormLabel>Time Due</FormLabel>
          <input
            type="time"
            name="time"
            className="w-full p-2 border rounded-lg"
            defaultValue={getCurrentTime()}
            required
          />
        </div>
      </div>

      {/* Recurring */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="recurring"
          name="isRecurring"
          onChange={(e) => setIsRecurring(e.target.checked)}
          className="h-4 w-4"
        />
        <label htmlFor="recurring">Recurring Task</label>
      </div>

      {/* Recurrence Days */}

      {isRecurring && (
        <fieldset className="pl-6">
          <FormLabel>Repeat for (days)</FormLabel>
          <input
            type="number"
            name="recurrenceDays"
            min="1"
            max="30"
            defaultValue="1"
            className="w-full p-2 border rounded-lg"
          />
        </fieldset>
      )}

      {/* Priority */}
      <fieldset className="flex items-center gap-2">
        <input type="checkbox" id="priority" name="isPriority" className="h-4 w-4" />
        <label htmlFor="priority">Priority Task</label>
      </fieldset>

      <SubmitButton buttonFor="Task" color="blue" isLoading={isPending} />
    </form>
  );
}
