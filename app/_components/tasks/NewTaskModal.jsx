"use client";
import { useState, useEffect } from "react";
import { XMarkIcon, CheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function NewTaskModal({ isOpen, onClose, onAddTask }) {
  // Initialize with current time
  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    time: getCurrentTime(), // Now uses current time
    isRecurring: false,
    recurrenceDays: 1,
    isPriority: false,
  });

  // Reset form when opening
  useEffect(() => {
    if (isOpen) {
      setFormData({
        title: "",
        date: new Date().toISOString().split("T")[0],
        time: getCurrentTime(),
        isRecurring: false,
        recurrenceDays: 1,
        isPriority: false,
      });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newTask = {
      ...formData,
      id: Date.now(),
      is_completed: false,
      due_date: `${formData.date}T${formData.time}:00.000Z`,
    };

    onAddTask(newTask);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Blurred Background */}
      <div className="absolute inset-0 bg-opacity-30 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div
          className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center border-b p-4">
            <h3 className="text-lg font-semibold">Add New Task</h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Title*</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
                autoFocus
              />
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time*</label>
                <input
                  type="time"
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
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg shadow-sm transition-colors font-medium"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
