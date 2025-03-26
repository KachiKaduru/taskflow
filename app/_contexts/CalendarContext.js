"use client";

import { createContext, useContext, useReducer, useMemo } from "react";

const ACTIONS = {
  SET_DATE: "SET_DATE",
  SET_VIEW: "SET_VIEW",
  RESET: "RESET",
};

const initialState = {
  date: new Date(),
  view: "day", // 'day', 'week', 'month'
};

// Reducer function
function calendarReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case ACTIONS.SET_VIEW:
      return {
        ...state,
        view: action.payload,
      };
    case ACTIONS.RESET:
      return {
        ...initialState,
        date: new Date(), // Always use current date when resetting
      };
    default:
      return state;
  }
}

export const CalendarContext = createContext();

export function CalendarProvider({ children }) {
  const [state, dispatch] = useReducer(calendarReducer, initialState);

  // Memoized context value to prevent unnecessary re-renders
  const value = useMemo(() => {
    const setDate = (date) => {
      dispatch({ type: ACTIONS.SET_DATE, payload: date });
    };

    const setView = (view) => {
      dispatch({ type: ACTIONS.SET_VIEW, payload: view });
    };

    const resetCalendar = () => {
      dispatch({ type: ACTIONS.RESET });
    };

    return {
      ...state,
      setDate,
      setView,
      resetCalendar,
    };
    //   }, [state]);
  }, [state.date, state.view]); // Only recreate when date or view changes

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
}
