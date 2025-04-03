"use client";

import { useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useTasks } from "@/app/_contexts/TaskContext";
import FormLabel from "../form/FormLabel";
import { createTask } from "@/app/_lib/actions/taskActions";
import Spinner from "../ui/Spinner";

export default function NewTaskModal({ onClose }) {
  const { addTask } = useTasks();
  const [loading, setLoading] = useState(false);

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const initialState = {
    title: "",
    date: new Date().toISOString().split("T")[0],
    time: getCurrentTime(),
    isRecurring: false,
    recurrenceDays: 1,
    isPriority: false,
    isCompleted: false,
  };

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) return;

    setLoading(true);
    try {
      const newTask = {
        ...formData,
        id: Date.now(),
        dueDate: `${formData.date}T${formData.time}:00.000Z`,
      };

      addTask(newTask);
      // await createTask(newTask);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setFormData(initialState);
      onClose();
    }
  };

  // action={submitTask}
  return (
    <form onSubmit={handleSubmit} className="p-2 space-y-4">
      {/* Title */}
      <div>
        <FormLabel>Title</FormLabel>
        <input
          type="text"
          value={formData.title}
          name="title"
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          required
          autoFocus
        />
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Due Date</FormLabel>
          <input
            type="date"
            value={formData.date}
            name="date"
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </div>
        <div>
          <FormLabel className="block text-sm font-medium text-gray-700 mb-1">Time Due</FormLabel>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
            required
          />
        </div>
      </div>

      {/* Recurring Task */}
      <div className="flex items-center space-x-3 pt-2">
        <input
          type="checkbox"
          id="recurring"
          name="isRecurring"
          checked={formData.isRecurring}
          onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <label htmlFor="recurring" className="text-sm text-gray-700">
          Recurring Task
        </label>
      </div>

      {formData.isRecurring && (
        <div className="pl-7">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Repeat for how many days?
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={formData.recurrenceDays}
            name="recurrenceDays"
            onChange={(e) =>
              setFormData({ ...formData, recurrenceDays: parseInt(e.target.value) || 1 })
            }
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      )}

      {/* Priority */}
      <div className="flex items-center space-x-3 pt-2">
        <input
          type="checkbox"
          id="priority"
          checked={formData.isPriority}
          name="isPriority"
          onChange={(e) => setFormData({ ...formData, isPriority: e.target.checked })}
          className="h-4 w-4 text-red-600 rounded focus:ring-red-500"
        />
        <label htmlFor="priority" className="text-sm text-gray-700 flex items-center">
          <ExclamationTriangleIcon className="h-4 w-4 mr-1 text-red-500" />
          Mark as Priority
        </label>
      </div>

      {/* Submit */}
      <div className="pt-6">
        <button
          // type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg shadow-sm transition-colors font-medium flex justify-center gap-3 disabled:bg-blue-900"
          disabled={loading}
        >
          {loading && <Spinner size="sm" />}
          <span>Add Task</span>
        </button>
      </div>
    </form>
  );
}
