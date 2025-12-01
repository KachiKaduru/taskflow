export const API_CONFIG = {
  baseURL: "http://127.0.0.1:8000",
  // baseURL: process.env.NEXT_PUBLIC_API_URL || "https://taskflow-backend-vmm3.onrender.com",
  endpoints: {
    auth: {
      login: "/auth/token",
      register: "/auth/create-user",
      me: "/users/me",
    },
    tasks: "/tasks",
    events: "/events",
    appointments: "/appointments",
  },
} as const;
