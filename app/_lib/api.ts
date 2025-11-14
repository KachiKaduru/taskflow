/**
 * API Client for TaskFlow FastAPI Backend
 * Handles all HTTP requests to the backend API
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://taskflow-backend-vmm3.onrender.com";

type ApiResponse<T> = {
  data?: T;
  error?: string;
  message?: string;
};

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Get JWT token from session or authenticate
   */
  private async getAuthToken(): Promise<string | null> {
    // This will be handled by the auth system
    // For now, we'll get it from the session
    return null;
  }

  /**
   * Make an authenticated request to the API
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    token?: string | null
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    };

    // Add JWT token if available
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
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
   * Authenticate with the backend and get JWT token
   */
  async authenticate(username: string, password: string): Promise<{ access_token: string }> {
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch(`${this.baseUrl}/auth/token`, {
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

    return response.json();
  }

  /**
   * Get current user information
   */
  async getCurrentUser(token: string): Promise<any> {
    return this.request("/auth/me", { method: "GET" }, token);
  }

  /**
   * Create a new user
   */
  async createUser(userData: {
    name?: string | null;
    email: string;
    image?: string | null;
    password?: string;
  }): Promise<any> {
    return this.request("/users/", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  /**
   * Get user by ID
   */
  async getUser(userId: string, token: string): Promise<any> {
    return this.request(`/users/${userId}`, { method: "GET" }, token);
  }

  /**
   * Get user by email (custom endpoint - may need backend support)
   */
  async getUserByEmail(email: string, token: string): Promise<any> {
    // If backend doesn't have this endpoint, we'll need to list users or add the endpoint
    // For now, assuming we can search by email
    const users = await this.request<any[]>(`/users/?email=${email}`, { method: "GET" }, token);
    return users?.[0] || null;
  }

  /**
   * Create a task
   */
  async createTask(taskData: any, token: string): Promise<void> {
    await this.request(
      "/tasks/",
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
  async getTasks(token: string): Promise<any[]> {
    return this.request<any[]>("/tasks/", { method: "GET" }, token);
  }

  /**
   * Get task by ID
   */
  async getTask(taskId: string | number, token: string): Promise<any> {
    return this.request(`/tasks/${taskId}`, { method: "GET" }, token);
  }

  /**
   * Update a task
   */
  async updateTask(taskId: string | number, taskData: any, token: string): Promise<void> {
    await this.request(
      `/tasks/${taskId}`,
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
  async deleteTask(taskId: string | number, token: string): Promise<void> {
    await this.request(`/tasks/${taskId}`, { method: "DELETE" }, token);
  }

  /**
   * Create an event
   */
  async createEvent(eventData: any, token: string): Promise<void> {
    await this.request(
      "/events/",
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
  async getEvents(token: string): Promise<any[]> {
    return this.request<any[]>("/events/", { method: "GET" }, token);
  }

  /**
   * Get event by ID
   */
  async getEvent(eventId: string | number, token: string): Promise<any> {
    return this.request(`/events/${eventId}`, { method: "GET" }, token);
  }

  /**
   * Update an event
   */
  async updateEvent(eventId: string | number, eventData: any, token: string): Promise<void> {
    await this.request(
      `/events/${eventId}`,
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
  async deleteEvent(eventId: string | number, token: string): Promise<void> {
    await this.request(`/events/${eventId}`, { method: "DELETE" }, token);
  }

  /**
   * Create an appointment
   */
  async createAppointment(appointmentData: any, token: string): Promise<void> {
    await this.request(
      "/appointments/",
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
  async getAppointments(token: string): Promise<any[]> {
    return this.request<any[]>("/appointments/", { method: "GET" }, token);
  }

  /**
   * Get appointment by ID
   */
  async getAppointment(appointmentId: string | number, token: string): Promise<any> {
    return this.request(`/appointments/${appointmentId}`, { method: "GET" }, token);
  }

  /**
   * Update an appointment
   */
  async updateAppointment(
    appointmentId: string | number,
    appointmentData: any,
    token: string
  ): Promise<void> {
    await this.request(
      `/appointments/${appointmentId}`,
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
  async deleteAppointment(appointmentId: string | number, token: string): Promise<void> {
    await this.request(`/appointments/${appointmentId}`, { method: "DELETE" }, token);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
