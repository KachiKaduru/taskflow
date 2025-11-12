"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { CreateTaskInput, TaskItem } from "@/app/_types";
import { getCurrentTime } from "@/app/_lib/helpers";
import { createGoogleTask } from "@/app/_lib/googleCalendar";
import { createTask } from "@/app/_lib/actions/taskActions";
import FormLabel from "../form/FormLabel";
import SubmitButton from "../ui/SubmitButton";

interface CreateTaskProps {
  onClose: () => void;
}

interface CreateTaskContext {
  previousTasks: TaskItem[];
}

export default function CreateTask({ onClose }: CreateTaskProps) {
  const queryClient = useQueryClient();
  const [isRecurring, setIsRecurring] = useState(false);

  const { isPending, mutate } = useMutation<CreateTaskInput, Error, CreateTaskInput, CreateTaskContext>({
    mutationFn: async (newTask) => {
      await Promise.all([createTask(newTask), createGoogleTask(newTask)]);
      return newTask;
    },
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = (queryClient.getQueryData<TaskItem[]>(["tasks"]) ?? []).slice();
      queryClient.setQueryData<TaskItem[]>(["tasks"], [...previousTasks, newTask]);
      onClose();

      return { previousTasks };
    },
    onError: (_error, _newTask, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
      toast.error("Error creating task :(");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onSuccess: () => {
      toast.success("Task created!");
      setIsRecurring(false);
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const newTask: CreateTaskInput = {
      id: Date.now(),
      title: String(formData.get("title")),
      time: String(formData.get("time")),
      date: String(formData.get("date")),
      dueDate: `${formData.get("date")}T${formData.get("time")}:00.000Z`,
      isCompleted: false,
      isPriority: formData.get("isPriority") === "on",
      isRecurring: formData.get("isRecurring") === "on",
      recurrenceDays: Number.parseInt(String(formData.get("recurrenceDays") ?? "1"), 10) || 1,
    };

    mutate(newTask);
  };

  return (
    <form action={handleSubmit} className="p-2 space-y-4">
      <div>
        <FormLabel>Title</FormLabel>
        <input name="title" className="w-full p-2 border rounded-lg" required autoFocus />
      </div>

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

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="recurring"
          name="isRecurring"
          onChange={(event) => setIsRecurring(event.target.checked)}
          className="h-4 w-4"
        />
        <label htmlFor="recurring">Recurring Task</label>
      </div>

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

      <fieldset className="flex items-center gap-2">
        <input type="checkbox" id="priority" name="isPriority" className="h-4 w-4" />
        <label htmlFor="priority">Priority Task</label>
      </fieldset>

      <SubmitButton buttonFor="Task" color="blue" isLoading={isPending} />
    </form>
  );
}
