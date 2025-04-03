"use client";
import { createContext, useContext, useReducer, useEffect } from "react";

// Action types
const ACTIONS = {
  SET_TASKS: "SET_TASKS",
  ADD_TASK: "ADD_TASK",
  DELETE_TASK: "DELETE_TASK",
  TOGGLE_COMPLETION: "TOGGLE_COMPLETION",
  UPDATE_FILTERS: "UPDATE_FILTERS",
  RESET_FILTERS: "RESET_FILTERS",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
};

// Initial state
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

// Reducer function
function taskReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_TASKS:
      return {
        ...state,
        tasks: [...action.payload],
        loading: false,
        error: null,
      };
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
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const { tasks, filters, loading, error } = state;

  // Fetch tasks on initial load
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  //       const response = await fetch("/api/tasks");
  //       if (!response.ok) throw new Error("Failed to fetch tasks");
  //       const data = await response.json();
  //       dispatch({ type: ACTIONS.SET_TASKS, payload: data });
  //     } catch (err) {
  //       dispatch({ type: ACTIONS.SET_ERROR, payload: err.message });
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  // Helper functions
  // const setTasks = (userTasks) => {
  //   dispatch({ type: ACTIONS.SET_TASKS, payload: userTasks });
  // };

  // const refreshTasks = async () => {
  //   try {
  //     dispatch({ type: ACTIONS.SET_LOADING, payload: true });
  //     const response = await fetch("/api/tasks");
  //     if (!response.ok) throw new Error("Failed to fetch tasks");
  //     const data = await response.json();
  //     dispatch({ type: ACTIONS.SET_TASKS, payload: data });
  //   } catch (err) {
  //     dispatch({ type: ACTIONS.SET_ERROR, payload: err.message });
  //   }
  // };

  const addTask = (task) => {
    try {
      // dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      // Here you would typically call your API to add the task to Supabase
      // Then refresh the task list
      // await refreshTasks();
      dispatch({ type: ACTIONS.ADD_TASKS, payload: task });
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message });
    }
  };

  const deleteTask = async (id) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      // Here you would typically call your API to delete the task from Supabase
      // Then refresh the task list or optimistically update
      // await refreshTasks();
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message });
    }
  };

  const toggleTaskCompletion = async (id) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      // Here you would typically call your API to update completion status
      // Then refresh the task list or optimistically update
      // await refreshTasks();
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message });
    }
  };

  const setFilters = (newFilters) => {
    dispatch({ type: ACTIONS.UPDATE_FILTERS, payload: newFilters });
  };

  const resetFilters = () => {
    dispatch({ type: ACTIONS.RESET_FILTERS });
  };

  // Memoized derived values
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
        filteredTasks,
        loading,
        error,
        filters,
        // setTasks,
        addTask,
        deleteTask,
        toggleTaskCompletion,
        // refreshTasks,
        getTodaysTasks,
        getCompletionRate,
        setFilters,
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
