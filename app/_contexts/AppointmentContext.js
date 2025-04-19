"use client";

import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useReducer, useMemo, useEffect } from "react";
import { getAppointments } from "../_lib/actions/appointmentActions";

const ACTIONS = {
  LOAD_APPOINTMENTS: "LOAD_APPOINTMENTS",
  ADD_APPOINTMENT: "ADD_APPOINTMENT",
  DELETE_APPOINTMENT: "DELETE_APPOINTMENT",
  UPDATE_APPOINTMENT: "UPDATE_APPOINTMENT",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
};

const initialState = {
  appointments: [],
  loading: false,
  error: null,
};

function appointmentReducer(state, action) {
  switch (action.type) {
    case ACTIONS.LOAD_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload,
      };
    case ACTIONS.ADD_APPOINTMENT:
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
      };
    case ACTIONS.DELETE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.filter((appt) => appt.id !== action.payload),
      };
    case ACTIONS.UPDATE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.map((appt) =>
          appt.id === action.payload.id ? { ...appt, ...action.payload.updates } : appt
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

export const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
  const [state, dispatch] = useReducer(appointmentReducer, initialState);
  const { data: fetchedAppts, isSuccess } = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  useEffect(() => {
    if (isSuccess) dispatch({ type: ACTIONS.LOAD_APPOINTMENTS, payload: fetchedAppts });
  }, [isSuccess, fetchedAppts]);

  const value = useMemo(() => {
    const addAppointment = (appointment) => {
      const newAppt = { ...appointment, id: Date.now() };
      dispatch({ type: ACTIONS.ADD_APPOINTMENT, payload: newAppt });
      localStorage.setItem("appointments", JSON.stringify([...state.appointments, newAppt]));
    };

    const deleteAppointment = (id) => {
      dispatch({ type: ACTIONS.DELETE_APPOINTMENT, payload: id });
    };

    const updateAppointment = (id, updates) => {
      dispatch({ type: ACTIONS.UPDATE_APPOINTMENT, payload: { id, updates } });
    };

    return {
      appointments: state.appointments,
      loading: state.loading,
      error: state.error,
      addAppointment,
      deleteAppointment,
      updateAppointment,
    };
  }, [state.appointments, state.loading, state.error]);

  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
}

export function useAppointments() {
  const context = useContext(AppointmentContext);
  if (context === undefined) {
    throw new Error("useAppointments must be used within an AppointmentProvider");
  }
  return context;
}
