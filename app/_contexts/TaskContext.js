"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useReducer, useMemo, useEffect } from "react";
import { getTasks } from "../_lib/actions/taskActions";

const ACTIONS = {
  LOAD_TASKS: "LOAD_TASKS",
  ADD_TASK: "ADD_TASK",
  DELETE_TASK: "DELETE_TASK",
  TOGGLE_COMPLETION: "TOGGLE_COMPLETION",
  UPDATE_FILTERS: "UPDATE_FILTERS",
  RESET_FILTERS: "RESET_FILTERS",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
};

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

function taskReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case ACTIONS.TOGGLE_COMPLETION:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          // task.id === action.payload ? { ...task, isCompleted: !task.isCompleted } : task
          task.id === action.payload ? { ...task, isCompleted: true } : task
        ),
      };
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const { data: fetchedTasks, isSuccess } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  useEffect(() => {
    if (isSuccess) dispatch({ type: ACTIONS.LOAD_TASKS, payload: fetchedTasks });
  }, [isSuccess, fetchedTasks]);

  const value = useMemo(() => {
    const addTask = (task) => {
      const now = Date.now();
      const newTasks = [];

      // Always create the initial task
      const baseTask = { ...task, id: now };
      newTasks.push(baseTask);

      // If it's recurring, add the additional instances
      if (task.isRecurring && task.recurrenceDays > 1) {
        for (let i = 1; i < task.recurrenceDays; i++) {
          const date = new Date(task.dueDate);
          date.setDate(date.getDate() + i);

          const recurringTask = {
            ...task,
            id: now + i,
            dueDate: date.toISOString(),
          };

          newTasks.push(recurringTask);
        }
      }

      // Dispatch all tasks
      newTasks.forEach((t) => {
        dispatch({ type: ACTIONS.ADD_TASK, payload: t });
      });

      // Update localStorage once with the correct final list
      const updatedTasks = [...state.tasks, ...newTasks];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const deleteTask = (id) => dispatch({ type: ACTIONS.DELETE_TASK, payload: id });
    const toggleTaskCompletion = (id) => dispatch({ type: ACTIONS.TOGGLE_COMPLETION, payload: id });

    // Derived values
    const getCompletionRate = () => {
      if (state.tasks.length === 0) return 0;
      const completed = state.tasks.filter((task) => task.isCompleted).length;
      return Math.round((completed / state.tasks.length) * 100);
    };

    return {
      ...state,
      addTask,
      deleteTask,
      toggleTaskCompletion,
      getCompletionRate,
    };
  }, [state]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
