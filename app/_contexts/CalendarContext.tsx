"use client";

import { createContext, useContext, useMemo, useReducer } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../_lib/actions/taskActions";
import { getEvents } from "../_lib/actions/eventActions";
import { getAppointments } from "../_lib/actions/appointmentActions";
import type {
  AppointmentItem,
  CalendarView,
  EventItem,
  ScheduleFilters,
  ScheduleItem,
  TaskItem,
} from "@/app/_types";

const ACTIONS = {
  SET_DATE: "SET_DATE",
  SET_VIEW: "SET_VIEW",
  RESET: "RESET",
  UPDATE_FILTERS: "UPDATE_FILTERS",
  RESET_FILTERS: "RESET_FILTERS",
} as const;

interface CalendarState {
  date: Date;
  view: CalendarView;
  loading: boolean;
  error: Error | null;
  filters: ScheduleFilters;
}

type CalendarAction =
  | { type: typeof ACTIONS.SET_DATE; payload: Date }
  | { type: typeof ACTIONS.SET_VIEW; payload: CalendarView }
  | { type: typeof ACTIONS.RESET }
  | { type: typeof ACTIONS.UPDATE_FILTERS; payload: Partial<ScheduleFilters> }
  | { type: typeof ACTIONS.RESET_FILTERS };

const initialState: CalendarState = {
  date: new Date(),
  view: "day",
  loading: false,
  error: null,
  filters: {
    date: "",
    month: "",
    type: "all",
    priority: false,
    status: "all",
  },
};

interface CalendarProviderProps {
  children: React.ReactNode;
  fetchedData?: {
    tasks?: TaskItem[];
    events?: EventItem[];
    appointments?: AppointmentItem[];
  };
}

interface CalendarContextValue extends CalendarState {
  scheduleItems: ScheduleItem[];
  setDate: (date: Date) => void;
  setView: (view: CalendarView) => void;
  resetCalendar: () => void;
  setFilters: (filters: Partial<ScheduleFilters>) => void;
  resetFilters: () => void;
  getTodaysSchedule: () => ScheduleItem[];
  getFilteredItems: () => ScheduleItem[];
  upcomingEvents: ScheduleItem[];
}

export const CalendarContext = createContext<CalendarContextValue | undefined>(undefined);

const resolvePrimaryDate = (item: ScheduleItem): Date | null => {
  if (item.type === "task") {
    const dateString = item.dueDate ?? item.date ?? null;
    return dateString ? new Date(dateString) : null;
  }

  if (item.type === "event") {
    return item.startTime ? new Date(item.startTime) : null;
  }

  return item.date ? new Date(item.date) : null;
};

const resolveComparableDate = (item: ScheduleItem): Date | null => {
  const primaryDate = resolvePrimaryDate(item);
  if (primaryDate) return primaryDate;

  if (item.type === "event" && item.endTime) {
    return new Date(item.endTime);
  }

  if (item.type === "task" && item.createdAt) {
    return new Date(item.createdAt);
  }

  return null;
};

function calendarReducer(state: CalendarState, action: CalendarAction): CalendarState {
  switch (action.type) {
    case ACTIONS.SET_DATE:
      return { ...state, date: action.payload };
    case ACTIONS.SET_VIEW:
      return { ...state, view: action.payload };
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

export function CalendarProvider({ children, fetchedData }: CalendarProviderProps) {
  const [state, dispatch] = useReducer(calendarReducer, initialState);

  const { data: tasks = [] } = useQuery<TaskItem[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
    initialData: fetchedData?.tasks,
  });

  const { data: events = [] } = useQuery<EventItem[]>({
    queryKey: ["events"],
    queryFn: getEvents,
    initialData: fetchedData?.events,
  });

  const { data: appointments = [] } = useQuery<AppointmentItem[]>({
    queryKey: ["appointments"],
    queryFn: getAppointments,
    initialData: fetchedData?.appointments,
  });

  const value = useMemo<CalendarContextValue>(() => {
    const setDate = (date: Date) => dispatch({ type: ACTIONS.SET_DATE, payload: date });
    const setView = (view: CalendarView) => dispatch({ type: ACTIONS.SET_VIEW, payload: view });
    const resetCalendar = () => dispatch({ type: ACTIONS.RESET });

    const setFilters = (newFilters: Partial<ScheduleFilters>) => {
      dispatch({ type: ACTIONS.UPDATE_FILTERS, payload: newFilters });
    };

    const resetFilters = () => {
      dispatch({ type: ACTIONS.RESET_FILTERS });
    };

    const scheduleItems: ScheduleItem[] = [
      ...tasks.map<ScheduleItem>((task) => ({ ...task, type: "task" as const })),
      ...events.map<ScheduleItem>((event) => ({ ...event, type: "event" as const })),
      ...appointments.map<ScheduleItem>((appt) => ({ ...appt, type: "appointment" as const })),
    ];

    const getTodaysSchedule = () => {
      const items = scheduleItems.filter(
        (entry) => resolvePrimaryDate(entry)?.toDateString() === new Date().toDateString()
      );

      return items.sort((a, b) => {
        const dateA = resolveComparableDate(a);
        const dateB = resolveComparableDate(b);
        if (!dateA || !dateB) return 0;
        return dateA.getTime() - dateB.getTime();
      });
    };

    const getFilteredItems = () => {
      return scheduleItems
        .filter((item) => {
          const itemDate = resolveComparableDate(item);
          if (!itemDate) {
            return false;
          }

          if (state.filters.date) {
            const filterDate = new Date(state.filters.date);
            if (itemDate.toDateString() !== filterDate.toDateString()) {
              return false;
            }
          }

          if (state.filters.month !== "") {
            if (itemDate.getMonth() !== Number.parseInt(state.filters.month, 10)) {
              return false;
            }
          }

          if (state.filters.type !== "all" && item.type !== state.filters.type) {
            return false;
          }

          if (state.filters.priority && item.type === "task" && !item.isPriority) {
            return false;
          }

          if (state.filters.status !== "all" && item.type === "task") {
            if (state.filters.status === "completed" && !item.isCompleted) return false;
            if (state.filters.status === "incomplete" && item.isCompleted) return false;
          }

          return true;
        })
        .sort((a, b) => {
          const dateA = resolveComparableDate(a);
          const dateB = resolveComparableDate(b);
          if (!dateA || !dateB) return 0;
          return dateA.getTime() - dateB.getTime();
        });
    };

    const upcomingEvents = scheduleItems
      .filter((item) => item.type === "event" || item.type === "appointment")
      .filter((item) => {
        const dateValue = resolveComparableDate(item);
        return dateValue ? dateValue > new Date() : false;
      })
      .sort((a, b) => {
        const dateA = resolveComparableDate(a);
        const dateB = resolveComparableDate(b);
        if (!dateA || !dateB) return 0;
        return dateA.getTime() - dateB.getTime();
      })
      .slice(0, 5);

    return {
      ...state,
      setDate,
      setView,
      resetCalendar,
      setFilters,
      resetFilters,
      scheduleItems,
      getTodaysSchedule,
      getFilteredItems,
      upcomingEvents,
    };
  }, [state, appointments, events, tasks]);

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
}

export function useCalendar(): CalendarContextValue {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
}
