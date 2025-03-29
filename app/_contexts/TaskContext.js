"use client";
import { createContext, useContext, useReducer } from "react";

// Action types
const ACTIONS = {
  ADD_TASK: "ADD_TASK",
  DELETE_TASK: "DELETE_TASK",
  TOGGLE_COMPLETION: "TOGGLE_COMPLETION",
  UPDATE_FILTERS: "UPDATE_FILTERS",
  RESET_FILTERS: "RESET_FILTERS",
};

// Initial state
const initialState = {
  tasks: [],
  filters: {
    date: "",
    month: "",
    priority: false,
    completed: "all", // 'all', 'completed', 'incomplete'
  },
};

// Reducer function
function taskReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, ...action.payload],
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
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };
    case ACTIONS.RESET_FILTERS:
      return {
        ...state,
        filters: initialState.filters,
      };

    default:
      return state;
  }
}

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const { tasks, filters } = state;

  // Helper functions
  const addTask = (task) => {
    const tasksToAdd = [
      {
        ...task,
        id: Date.now(),
        isCompleted: false,
        // created_at: new Date().toISOString(),
      },
    ];

    if (task.isRecurring && task.recurrenceDays > 1) {
      for (let i = 1; i < task.recurrenceDays; i++) {
        const date = new Date(task.dueDate);
        date.setDate(date.getDate() + i);
        tasksToAdd.push({
          ...task,
          id: Date.now() + i,
          dueDate: date.toISOString(),
        });
      }
    }

    dispatch({ type: ACTIONS.ADD_TASK, payload: tasksToAdd });
  };

  const deleteTask = (id) => {
    dispatch({ type: ACTIONS.DELETE_TASK, payload: id });
  };

  const toggleTaskCompletion = (id) => {
    dispatch({ type: ACTIONS.TOGGLE_COMPLETION, payload: id });
  };

  const setFilters = (newFilters) => {
    dispatch({ type: ACTIONS.UPDATE_FILTERS, payload: newFilters });
  };

  const resetFilters = () => {
    dispatch({ type: ACTIONS.RESET_FILTERS });
  };

  // Derived values
  const getTodaysTasks = () => {
    const today = new Date().toDateString();
    return tasks.filter((task) => task.dueDate && new Date(task.dueDate).toDateString() === today);
  };

  const getCompletionRate = () => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((task) => task.isCompleted).length;
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
        (filters.completed === "completed" && task.isCompleted) ||
        (filters.completed === "incomplete" && !task.isCompleted);

      return matchesDate && matchesMonth && matchesPriority && matchesCompletion;
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

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
        resetFilters,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within the TaskProvider");
  }
  return context;
}
