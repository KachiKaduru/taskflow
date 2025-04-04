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
    itemType: "all", // 'all', 'task', 'event', 'appointment'
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

export function CalendarProvider({ children }) {
  const [state, dispatch] = useReducer(calendarReducer, initialState);
  const { tasks } = useTasks();
  const { events } = useEvents();
  const { appointments } = useAppointments();

  // Combine all schedule items when dependencies change
  useEffect(() => {
    const combined = [
      ...tasks.map((task) => ({ ...task, type: "task" })),
      ...events.map((event) => ({ ...event, type: "event" })),
      ...appointments.map((appt) => ({ ...appt, type: "appointment" })),
    ];
    dispatch({ type: ACTIONS.SET_SCHEDULE_ITEMS, payload: combined });
  }, [tasks, events, appointments]);

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

    // Filter schedule items by current view
    const getScheduleItems = () => {
      const currentDate = state.date;
      const items = state.scheduleItems.filter((item) => {
        const itemDate = new Date(item.date || item.dueDate || item.startTime);

        if (state.view === "day") {
          return itemDate.toDateString() === currentDate.toDateString();
        }
        if (state.view === "week") {
          const startOfWeek = new Date(currentDate);
          startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          return itemDate >= startOfWeek && itemDate <= endOfWeek;
        }
        if (state.view === "month") {
          return (
            itemDate.getMonth() === currentDate.getMonth() &&
            itemDate.getFullYear() === currentDate.getFullYear()
          );
        }
        return false;
      });

      return items.sort((a, b) => {
        const dateA = new Date(a.date || a.dueDate || a.startTime);
        const dateB = new Date(b.date || b.dueDate || b.startTime);
        return dateA - dateB;
      });
    };

    return {
      ...state,
      setDate,
      setView,
      resetCalendar,
      getScheduleItems,
      setFilters,
      resetFilters,
    };
  }, [state.date, state.view, state.scheduleItems]);

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
}
