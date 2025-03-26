"use client";
import { createContext, useContext, useState } from "react";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    month: "",
    priority: false,
    completed: "all", // 'all', 'completed', 'incomplete'
  });

  // Add new task
  const addTask = (task) => {
    const tasksToAdd = [
      {
        ...task,
        id: Date.now(),
        is_completed: false,
        created_at: new Date().toISOString(),
      },
    ];

    // Handle recurring tasks
    if (task.isRecurring && task.recurrenceDays > 1) {
      for (let i = 1; i < task.recurrenceDays; i++) {
        const date = new Date(task.due_date);
        date.setDate(date.getDate() + i);
        tasksToAdd.push({
          ...task,
          id: Date.now() + i,
          due_date: date.toISOString(),
        });
      }
    }

    setTasks([...tasks, ...tasksToAdd]);
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle task completion
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, is_completed: !task.is_completed } : task))
    );
  };

  // Get today's tasks
  const getTodaysTasks = () => {
    const today = new Date().toDateString();
    return tasks.filter(
      (task) => task.due_date && new Date(task.due_date).toDateString() === today
    );
  };

  // Calculate completion rate
  const getCompletionRate = () => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((task) => task.is_completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const filteredTasks = tasks
    .filter((task) => {
      const taskDate = new Date(task.due_date);
      const matchesDate =
        !filters.date || taskDate.toDateString() === new Date(filters.date).toDateString();
      const matchesMonth = !filters.month || taskDate.getMonth() === parseInt(filters.month);
      const matchesPriority = !filters.priority || task.isPriority;
      const matchesCompletion =
        filters.completed === "all" ||
        (filters.completed === "completed" && task.is_completed) ||
        (filters.completed === "incomplete" && !task.is_completed);

      return matchesDate && matchesMonth && matchesPriority && matchesCompletion;
    })
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleTaskCompletion,
        getTodaysTasks,
        getCompletionRate,
        filters,
        setFilters,
        filteredTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
