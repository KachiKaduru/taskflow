"use client";
import { createContext, useContext, useReducer, useMemo } from "react";

const ACTIONS = {
  ADD_EVENT: "ADD_EVENT",
  DELETE_EVENT: "DELETE_EVENT",
  UPDATE_EVENT: "UPDATE_EVENT",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
};

const initialState = {
  events: [],
  loading: false,
  error: null,
};

function eventReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case ACTIONS.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    case ACTIONS.UPDATE_EVENT:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? { ...event, ...action.payload.updates } : event
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

export const EventContext = createContext();

export function EventProvider({ children }) {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  const value = useMemo(() => {
    const addEvent = (event) => {
      dispatch({ type: ACTIONS.ADD_EVENT, payload: { ...event, id: Date.now() } });
    };

    const deleteEvent = (id) => {
      dispatch({ type: ACTIONS.DELETE_EVENT, payload: id });
    };

    const updateEvent = (id, updates) => {
      dispatch({ type: ACTIONS.UPDATE_EVENT, payload: { id, updates } });
    };

    return {
      events: state.events,
      loading: state.loading,
      error: state.error,
      addEvent,
      deleteEvent,
      updateEvent,
    };
  }, [state.events, state.loading, state.error]);

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
}
