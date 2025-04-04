"use client";

import { createContext, useContext, useReducer, useMemo } from "react";

const ACTIONS = {
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
  filters: {
    date: "",
    month: "",
    priority: false,
    completed: "all",
  },
  loading: false,
  error: null,
};

function taskReducer(state, action) {
  switch (action.type) {
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
          task.id === action.payload ? { ...task, isCompleted: !task.isCompleted } : task
        ),
      };
    case ACTIONS.UPDATE_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case ACTIONS.RESET_FILTERS:
      return {
        ...state,
        filters: initialState.filters,
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

  const value = useMemo(() => {
    const addTask = (task) => {
      const taskToAdd = { ...task, id: Date.now() };
      dispatch({ type: ACTIONS.ADD_TASK, payload: taskToAdd });

      if (task.isRecurring && task.recurrenceDays > 1) {
        for (let i = 1; i < task.recurrenceDays; i++) {
          const date = new Date(task.dueDate);
          date.setDate(date.getDate() + i);
          dispatch({
            type: ACTIONS.ADD_TASK,
            payload: {
              ...task,
              id: Date.now() + i,
              dueDate: date.toISOString(),
            },
          });
        }
      }
    };

    const deleteTask = (id) => dispatch({ type: ACTIONS.DELETE_TASK, payload: id });
    const toggleTaskCompletion = (id) => dispatch({ type: ACTIONS.TOGGLE_COMPLETION, payload: id });
    const setFilters = (newFilters) =>
      dispatch({ type: ACTIONS.UPDATE_FILTERS, payload: newFilters });
    const resetFilters = () => dispatch({ type: ACTIONS.RESET_FILTERS });

    // Derived values
    const getTodaysTasks = () => {
      const today = new Date().toDateString();
      return state.tasks.filter(
        (task) => task.dueDate && new Date(task.dueDate).toDateString() === today
      );
    };

    const getCompletionRate = () => {
      if (state.tasks.length === 0) return 0;
      const completed = state.tasks.filter((task) => task.isCompleted).length;
      return Math.round((completed / state.tasks.length) * 100);
    };

    const filteredTasks = state.tasks
      .filter((task) => {
        const taskDate = new Date(task.dueDate);
        const matchesDate =
          !state.filters.date ||
          taskDate.toDateString() === new Date(state.filters.date).toDateString();
        const matchesMonth =
          !state.filters.month || taskDate.getMonth() === parseInt(state.filters.month);
        const matchesPriority = !state.filters.priority || task.isPriority;
        const matchesCompletion =
          state.filters.completed === "all" ||
          (state.filters.completed === "completed" && task.isCompleted) ||
          (state.filters.completed === "incomplete" && !task.isCompleted);

        return matchesDate && matchesMonth && matchesPriority && matchesCompletion;
      })
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    return {
      tasks: state.tasks,
      filteredTasks,
      loading: state.loading,
      error: state.error,
      filters: state.filters,
      addTask,
      deleteTask,
      toggleTaskCompletion,
      getTodaysTasks,
      getCompletionRate,
      setFilters,
      resetFilters,
    };
  }, [state.tasks, state.filters, state.loading, state.error]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
