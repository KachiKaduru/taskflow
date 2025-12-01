/**
 * API Client for TaskFlow Backend
 * Handles all HTTP requests with automatic token management
 */

import { API_CONFIG } from "./api/config";
import { tokenStorage } from "./auth/token";

type ApiResponse<T> = {
  data?: T;
  error?: string;
  message?: string;
};

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
  }

  /**
   * Make an authenticated request to the API
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    token?: string | null
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    // Get token from storage if not provided (client-side)
    const authToken = token || (typeof window !== "undefined" ? tokenStorage.get() : null);

    // Add JWT token if available
    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      // Handle 401 Unauthorized - token expired or invalid
      if (response.status === 401) {
        if (typeof window !== "undefined") {
          tokenStorage.remove();
        }
        throw new Error("Authentication failed. Please log in again.");
      }

      // Handle 404 Not Found - better error message
      if (response.status === 404) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.detail || errorData.message || `Endpoint not found: ${endpoint}. Please check if the backend is running and the endpoint is correct.`
        );
      }

      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    // Handle empty responses
    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return {} as T;
    }

    return response.json();
  }

  /**
   * Login - Authenticate with username and password
   */
  async login(
    username: string,
    password: string
  ): Promise<{ access_token: string; token_type: string }> {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch(`${this.baseURL}${API_CONFIG.endpoints.auth.login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || errorData.message || `Authentication failed: ${response.status}`
      );
    }

    const data = await response.json();

    // Store token in localStorage (client-side only)
    if (typeof window !== "undefined" && data.access_token) {
      tokenStorage.set(data.access_token);
    }

    return data;
  }

  /**
   * Register - Create a new user
   */
  async register(userData: { email: string; password: string; name?: string }): Promise<any> {
    const response = await fetch(`${this.baseURL}${API_CONFIG.endpoints.auth.register}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || errorData.message || `Registration failed: ${response.status}`
      );
    }

    return response.json();
  }

  /**
   * Get current user information
   */
  async getCurrentUser(token?: string | null): Promise<any> {
    return this.request(API_CONFIG.endpoints.auth.me, { method: "GET" }, token);
  }

  /**
   * Create a task
   */
  async createTask(taskData: any, token?: string | null): Promise<void> {
    await this.request(
      API_CONFIG.endpoints.tasks,
      {
        method: "POST",
        body: JSON.stringify(taskData),
      },
      token
    );
  }

  /**
   * Get all tasks
   */
  async getTasks(token?: string | null): Promise<any[]> {
    return this.request<any[]>(API_CONFIG.endpoints.tasks, { method: "GET" }, token);
  }

  /**
   * Get task by ID
   */
  async getTask(taskId: string | number, token?: string | null): Promise<any> {
    return this.request(`${API_CONFIG.endpoints.tasks}/${taskId}`, { method: "GET" }, token);
  }

  /**
   * Update a task
   */
  async updateTask(taskId: string | number, taskData: any, token?: string | null): Promise<void> {
    await this.request(
      `${API_CONFIG.endpoints.tasks}/${taskId}`,
      {
        method: "PUT",
        body: JSON.stringify(taskData),
      },
      token
    );
  }

  /**
   * Delete a task
   */
  async deleteTask(taskId: string | number, token?: string | null): Promise<void> {
    await this.request(`${API_CONFIG.endpoints.tasks}/${taskId}`, { method: "DELETE" }, token);
  }

  /**
   * Create an event
   */
  async createEvent(eventData: any, token?: string | null): Promise<void> {
    await this.request(
      API_CONFIG.endpoints.events,
      {
        method: "POST",
        body: JSON.stringify(eventData),
      },
      token
    );
  }

  /**
   * Get all events
   */
  async getEvents(token?: string | null): Promise<any[]> {
    return this.request<any[]>(API_CONFIG.endpoints.events, { method: "GET" }, token);
  }

  /**
   * Get event by ID
   */
  async getEvent(eventId: string | number, token?: string | null): Promise<any> {
    return this.request(`${API_CONFIG.endpoints.events}/${eventId}`, { method: "GET" }, token);
  }

  /**
   * Update an event
   */
  async updateEvent(
    eventId: string | number,
    eventData: any,
    token?: string | null
  ): Promise<void> {
    await this.request(
      `${API_CONFIG.endpoints.events}/${eventId}`,
      {
        method: "PUT",
        body: JSON.stringify(eventData),
      },
      token
    );
  }

  /**
   * Delete an event
   */
  async deleteEvent(eventId: string | number, token?: string | null): Promise<void> {
    await this.request(`${API_CONFIG.endpoints.events}/${eventId}`, { method: "DELETE" }, token);
  }

  /**
   * Create an appointment
   */
  async createAppointment(appointmentData: any, token?: string | null): Promise<void> {
    await this.request(
      API_CONFIG.endpoints.appointments,
      {
        method: "POST",
        body: JSON.stringify(appointmentData),
      },
      token
    );
  }

  /**
   * Get all appointments
   */
  async getAppointments(token?: string | null): Promise<any[]> {
    return this.request<any[]>(API_CONFIG.endpoints.appointments, { method: "GET" }, token);
  }

  /**
   * Get appointment by ID
   */
  async getAppointment(appointmentId: string | number, token?: string | null): Promise<any> {
    return this.request(
      `${API_CONFIG.endpoints.appointments}/${appointmentId}`,
      { method: "GET" },
      token
    );
  }

  /**
   * Update an appointment
   */
  async updateAppointment(
    appointmentId: string | number,
    appointmentData: any,
    token?: string | null
  ): Promise<void> {
    await this.request(
      `${API_CONFIG.endpoints.appointments}/${appointmentId}`,
      {
        method: "PUT",
        body: JSON.stringify(appointmentData),
      },
      token
    );
  }

  /**
   * Delete an appointment
   */
  async deleteAppointment(appointmentId: string | number, token?: string | null): Promise<void> {
    await this.request(
      `${API_CONFIG.endpoints.appointments}/${appointmentId}`,
      { method: "DELETE" },
      token
    );
  }
}

export const apiClient = new ApiClient();
