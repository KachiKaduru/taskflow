"use client";
import { createContext, useContext, useReducer, useMemo, useEffect } from "react";
import { useTasks } from "./TaskContext";
import { useEvents } from "./EventContext";
import { useAppointments } from "./AppointmentContext";

const ACTIONS = {
  SET_DATE: "SET_DATE",
  SET_VIEW: "SET_VIEW",
  SET_SCHEDULE_ITEMS: "SET_SCHEDULE_ITEMS",
  RESET: "RESET",
  UPDATE_FILTERS: "UPDATE_FILTERS",
  RESET_FILTERS: "RESET_FILTERS",
};

const initialState = {
  date: new Date(),
  view: "day", // 'day', 'week', 'month'
  scheduleItems: [],
  loading: false,
  error: null,
  filters: {
    date: "",
    month: "",
    type: "all", // 'all', 'task', 'event', 'appointment'
    priority: false,
    status: "all", // 'all', 'completed', 'incomplete'
  },
};

function calendarReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_DATE:
      return { ...state, date: action.payload };
    case ACTIONS.SET_VIEW:
      return { ...state, view: action.payload };
    case ACTIONS.SET_SCHEDULE_ITEMS:
      return { ...state, scheduleItems: action.payload };
    case ACTIONS.RESET:
      return { ...initialState, date: new Date() };
    case ACTIONS.UPDATE_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case ACTIONS.RESET_FILTERS:
      return { ...state, filters: initialState.filters };
    default:
      return state;
  }
}

export const CalendarContext = createContext();

export function CalendarProvider({ children, initialData }) {
  const [state, dispatch] = useReducer(calendarReducer, initialState);
  const { tasks } = useTasks();
  const { events } = useEvents();
  const { appointments } = useAppointments();

  const fetchedTasks = initialData?.tasks;
  const fetchedEvents = initialData?.events;
  const fetchedAppointments = initialData?.appointments;

  // Combine all schedule items when dependencies change
  useEffect(() => {
    const combined = [
      ...fetchedTasks.map((task) => ({ ...task, type: "task" })),
      ...fetchedEvents.map((event) => ({ ...event, type: "event" })),
      ...fetchedAppointments.map((appt) => ({ ...appt, type: "appointment" })),
      // ...tasks.map((task) => ({ ...task, type: "task" })),
      // ...events.map((event) => ({ ...event, type: "event" })),
      // ...appointments.map((appt) => ({ ...appt, type: "appointment" })),
    ];
    dispatch({ type: ACTIONS.SET_SCHEDULE_ITEMS, payload: combined });
  }, [fetchedTasks, fetchedEvents, fetchedAppointments]);

  const value = useMemo(() => {
    const setDate = (date) => dispatch({ type: ACTIONS.SET_DATE, payload: date });
    const setView = (view) => dispatch({ type: ACTIONS.SET_VIEW, payload: view });
    const resetCalendar = () => dispatch({ type: ACTIONS.RESET });

    const setFilters = (newFilters) => {
      dispatch({ type: ACTIONS.UPDATE_FILTERS, payload: newFilters });
    };

    const resetFilters = () => {
      dispatch({ type: ACTIONS.RESET_FILTERS });
    };

    const getTodaysSchedule = () => {
      const items = state.scheduleItems.filter(
        (e) =>
          new Date(e.dueDate || e.startTime || e.date).toDateString() === new Date().toDateString()
      );

      const todaysItems = items.sort((a, b) => {
        const dateA = new Date(a.dueDate || a.startTime || a.date);
        const dateB = new Date(b.dueDate || b.startTime || b.date);
        return dateA - dateB;
      });

      return todaysItems;
    };

    // Filter schedule items by current view
    const getFilteredItems = () => {
      return state.scheduleItems
        .filter((item) => {
          const itemDate = new Date(item.date || item.dueDate || item.startTime);

          // 1. Date Filter
          if (state.filters.date) {
            // const itemDate = new Date(item.date || item.dueDate || item.startTime);
            const filterDate = new Date(state.filters.date);
            if (itemDate.toDateString() !== filterDate.toDateString()) {
              return false;
            }
          }

          // 2. Month Filter
          if (state.filters.month !== "") {
            // const itemDate = new Date(item.date || item.dueDate || item.startTime);
            if (itemDate.getMonth() !== parseInt(state.filters.month)) {
              return false;
            }
          }

          // 3. Item Type Filter
          if (state.filters.type !== "all" && item.type !== state.filters.type) {
            return false;
          }

          // 4. Priority Filter (tasks only)
          if (state.filters.priority && item.type === "task" && !item.isPriority) {
            return false;
          }

          // 5. Status Filter (tasks only)
          if (state.filters.status !== "all" && item.type === "task") {
            if (state.filters.status === "completed" && !item.isCompleted) return false;
            if (state.filters.status === "incomplete" && item.isCompleted) return false;
          }

          return true; // Item passed all filters
        })
        .sort((a, b) => {
          // Sorting by date (same as your existing sort)
          const dateA = new Date(a.date || a.dueDate || a.startTime);
          const dateB = new Date(b.date || b.dueDate || b.startTime);
          return dateA - dateB;
        });
    };

    const upcomingEvents = [
      ...state.scheduleItems
        .filter((item) => item.type === "event" || item.type === "appointment")
        .filter((item) => new Date(item.startTime || item.date) > new Date())
        .sort((a, b) => new Date(a.startTime || a.date) - new Date(b.startTime || b.date))
        .slice(0, 5),
    ]; // Top 5 soonest

    return {
      ...state,
      setDate,
      setView,
      resetCalendar,
      setFilters,
      resetFilters,
      getTodaysSchedule,
      getFilteredItems,
      upcomingEvents,
    };
  }, [state]);

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
}
