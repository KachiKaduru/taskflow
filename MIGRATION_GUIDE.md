# TaskFlow Backend Migration Guide

## Overview

This document explains how the frontend was migrated from Supabase to the FastAPI backend hosted on Render. It breaks down each file, their responsibilities, and the complete authentication and data flow.

---

## 📁 File Structure & Responsibilities

### 1. `app/_lib/api.ts` - API Client

**Purpose**: Central HTTP client for all backend API calls

**Key Components**:

- **`ApiClient` class**: Encapsulates all API communication
- **`baseUrl`**: Points to `https://taskflow-backend-vmm3.onrender.com`
- **`request()` method**: Private method that handles all HTTP requests with JWT authentication
- **Public methods**: CRUD operations for users, tasks, events, and appointments

**How it works**:

```typescript
// Example: Making an authenticated request
private async request<T>(endpoint, options, token) {
  // 1. Build full URL
  const url = `${this.baseUrl}${endpoint}`

  // 2. Add headers (Content-Type + Authorization if token exists)
  headers["Authorization"] = `Bearer ${token}`

  // 3. Make fetch request
  // 4. Handle errors
  // 5. Return JSON response
}
```

**Key Methods**:

- `authenticate(username, password)` → Gets JWT token from `/auth/token`
- `getCurrentUser(token)` → Gets user info from `/auth/me`
- `createUser(userData)` → Creates user at `/users/`
- `getTasks(token)` → Gets all tasks from `/tasks/`
- `createTask(taskData, token)` → Creates task at `/tasks/`
- Similar methods for events and appointments

---

### 2. `app/_lib/backendAuth.ts` - Backend Authentication Helper

**Purpose**: Bridges Google OAuth with backend JWT authentication

**The Problem**:

- Frontend uses Google OAuth (no password)
- Backend requires username/password for JWT tokens
- Need to create users in backend automatically

**Solution**:

- Generate deterministic passwords for OAuth users
- Automatically create users if they don't exist
- Authenticate and return JWT token

**How it works**:

```typescript
function generatePasswordForEmail(email: string) {
  // Uses SHA256 hash of (email + secret)
  // Same email always generates same password
  // Users never see this password (OAuth only)
}

async function getBackendToken(email, name, image) {
  // 1. Generate password for this email
  const password = generatePasswordForEmail(email);

  // 2. Try to authenticate (user might exist)
  try {
    return await apiClient.authenticate(email, password);
  } catch {
    // 3. If auth fails, create user
    await apiClient.createUser({ email, name, image, password });

    // 4. Then authenticate with new user
    return await apiClient.authenticate(email, password);
  }
}
```

**Flow**:

1. User signs in with Google → email received
2. Generate password from email (deterministic)
3. Try authenticating with backend
4. If user doesn't exist → create user → authenticate
5. Return JWT token

---

### 3. `app/_lib/auth.ts` - NextAuth Configuration

**Purpose**: Integrates Google OAuth with backend JWT tokens

**Key Callbacks**:

#### `signIn` Callback (Lines 66-103)

**When**: User successfully authenticates with Google

**What it does**:

```typescript
async signIn({ user, account }) {
  // 1. Get backend JWT token (creates user if needed)
  const backendToken = await getBackendToken(user.email, user.name, user.image)
  user.backendToken = backendToken

  // 2. Get user info from backend to set user.id
  const backendUser = await apiClient.getCurrentUser(backendToken)
  user.id = backendUser.id.toString()

  // 3. Store Google OAuth tokens
  user.accessToken = account.access_token // For Google Calendar API

  return true // Allow sign-in
}
```

#### `jwt` Callback (Lines 105-128)

**When**: JWT token is created/updated

**What it does**:

```typescript
async jwt({ token, user }) {
  // Store all tokens in JWT
  token.backendToken = user.backendToken  // Backend JWT
  token.accessToken = user.accessToken    // Google OAuth
  token.id = user.id                      // User ID

  return token
}
```

#### `session` Callback (Lines 130-143)

**When**: Session is accessed (on every request)

**What it does**:

```typescript
async session({ session, token }) {
  // Copy tokens from JWT to session
  session.backendToken = token.backendToken
  session.accessToken = token.accessToken
  session.user.id = token.id

  return session
}
```

**Result**: Session now contains `backendToken` for API calls

---

### 4. `app/_lib/actions/userActions.ts` - User Actions

**Purpose**: Server actions for user-related operations

**Key Functions**:

#### `getUserEmail(email)`

```typescript
async function getUserEmail(email) {
  // 1. Get backend token from session
  const token = await getBackendToken();

  // 2. Call backend API
  const currentUser = await apiClient.getCurrentUser(token);

  // 3. Transform backend format to frontend format
  return {
    id: currentUser.id,
    email: currentUser.email,
    name: currentUser.name,
    // ... map snake_case to camelCase
  };
}
```

#### `createUser(newUser)`

- Now uses `getBackendToken()` internally
- Kept for backward compatibility
- Actually handled automatically during sign-in

---

### 5. `app/_lib/actions/taskActions.ts` - Task Actions

**Purpose**: Server actions for task CRUD operations

**Pattern** (same for events/appointments):

```typescript
async function getBackendToken() {
  const session = await auth();
  return session.backendToken; // From NextAuth session
}

export async function createTask(task) {
  // 1. Verify user is authenticated
  const session = await auth();
  if (!session?.user?.id) throw Error();

  // 2. Get backend token
  const token = await getBackendToken();

  // 3. Transform frontend format → backend format
  const taskData = {
    title: task.title,
    due_date: task.dueDate, // camelCase → snake_case
    is_completed: task.isCompleted,
    // ...
  };

  // 4. Call API client
  await apiClient.createTask(taskData, token);
}

export async function getTasks() {
  // 1. Get token
  const token = await getBackendToken();

  // 2. Call API
  const tasks = await apiClient.getTasks(token);

  // 3. Transform backend format → frontend format
  return tasks.map((task) => ({
    id: task.id,
    dueDate: task.due_date, // snake_case → camelCase
    isCompleted: task.is_completed,
    // ...
  }));
}
```

**Data Transformation**:

- Frontend uses `camelCase` (JavaScript convention)
- Backend uses `snake_case` (Python convention)
- Actions handle the conversion both ways

---

## 🔄 Complete Flow: User Sign-In to API Call

### Step 1: User Clicks "Sign In with Google"

```bash
User → Login Page → signInWithGoogle() → NextAuth signIn("google")
```

### Step 2: Google OAuth Flow

```bash
NextAuth → Google OAuth → User authorizes → Google returns:
  - email: "user@example.com"
  - name: "John Doe"
  - image: "https://..."
  - access_token: "google_oauth_token"
```

### Step 3: NextAuth `signIn` Callback

```bash
signIn callback triggered:
  1. Call getBackendToken(user.email, user.name, user.image)
     ↓
  2. backendAuth.ts generates password from email
     ↓
  3. Try apiClient.authenticate(email, password)
     ↓
  4a. If user exists → Return JWT token
  4b. If user doesn't exist:
      - Call apiClient.createUser({ email, name, image, password })
      - Then call apiClient.authenticate(email, password)
      - Return JWT token
     ↓
  5. Store backendToken in user object
  6. Call apiClient.getCurrentUser(backendToken) to get user.id
  7. Store user.id in user object
  8. Store Google OAuth tokens
```

### Step 4: NextAuth `jwt` Callback

```bash
JWT callback triggered:
  - Store backendToken in JWT
  - Store accessToken (Google) in JWT
  - Store user.id in JWT
  - Return token
```

### Step 5: NextAuth `session` Callback

```bash
Session callback triggered (on every request):
  - Copy backendToken from JWT to session
  - Copy accessToken from JWT to session
  - Copy user.id from JWT to session
  - Return session
```

### Step 6: User Makes API Call (e.g., Create Task)

```bash
Component → createTask() action
  ↓
taskActions.ts:
  1. await auth() → Get session
  2. session.backendToken → Extract JWT
  3. Transform task data (camelCase → snake_case)
  4. apiClient.createTask(taskData, token)
     ↓
api.ts:
  1. Build URL: https://taskflow-backend-vmm3.onrender.com/tasks/
  2. Add headers:
     - Content-Type: application/json
     - Authorization: Bearer <JWT_TOKEN>
  3. POST request with task data
  4. Backend validates JWT
  5. Backend creates task
  6. Return response
     ↓
taskActions.ts:
  - Handle response/errors
  - Return to component
```

---

## 🔐 Authentication Flow Diagram

```bash
┌─────────────┐
│   User      │
│  Signs In   │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  Google OAuth   │
│  (NextAuth)     │
└──────┬──────────┘
       │ Returns: email, name, image
       ▼
┌─────────────────────────┐
│  signIn Callback        │
│  (auth.ts)              │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│  getBackendToken()      │
│  (backendAuth.ts)       │
│  - Generate password    │
│  - Create user if needed│
│  - Authenticate         │
└──────┬──────────────────┘
       │ Returns: JWT token
       ▼
┌─────────────────────────┐
│  jwt Callback           │
│  - Store backendToken    │
│  - Store Google tokens   │
└──────┬──────────────────┘
       │
       ▼
┌─────────────────────────┐
│  session Callback        │
│  - Copy tokens to session│
└──────┬───────────────────┘
       │
       ▼
┌─────────────────────────┐
│  Session Available       │
│  - session.backendToken │
│  - session.user.id      │
└─────────────────────────┘
```

---

## 📊 Data Flow: Creating a Task

```bash
┌──────────────┐
│  Component   │
│  (React)     │
└──────┬───────┘
       │ Calls: createTask({ title: "Buy milk", dueDate: "2024-01-01" })
       ▼
┌──────────────────────┐
│  taskActions.ts       │
│  createTask()        │
└──────┬───────────────┘
       │
       ├─→ await auth() → Get session
       ├─→ session.backendToken → Extract JWT
       │
       │ Transform data:
       │ { title, dueDate } → { title, due_date }
       │
       ▼
┌──────────────────────┐
│  api.ts              │
│  apiClient.createTask│
└──────┬───────────────┘
       │
       ├─→ Build URL: /tasks/
       ├─→ Add headers: Authorization: Bearer <JWT>
       ├─→ POST request
       │
       ▼
┌──────────────────────┐
│  FastAPI Backend     │
│  (Render)            │
└──────┬───────────────┘
       │
       ├─→ Validate JWT
       ├─→ Extract user_id from JWT
       ├─→ Create task in database
       ├─→ Return success
       │
       ▼
┌──────────────────────┐
│  Response flows back │
│  through layers      │
└──────────────────────┘
```

---

## 🔑 Key Concepts

### 1. **Dual Authentication**

- **Google OAuth**: For frontend authentication (NextAuth)
- **Backend JWT**: For API authentication (FastAPI)
- Both tokens stored in session

### 2. **Deterministic Password Generation**

- OAuth users don't have passwords
- Generate password from email + secret
- Same email = same password (for backend auth)
- Users never see this password

### 3. **Data Transformation**

- Frontend: `camelCase` (JavaScript)
- Backend: `snake_case` (Python)
- Actions handle conversion both ways

### 4. **Token Storage**

```bash
Session Structure:
{
  user: { id, email, name, image },
  backendToken: "jwt_from_backend",
  accessToken: "google_oauth_token",
  refreshToken: "google_refresh_token"
}
```

### 5. **Error Handling**

- If backend token missing → Error message
- If backend unreachable → Graceful degradation
- If user creation fails → Retry authentication

---

## 🛠️ Environment Variables

```env
# Backend API URL (optional, has default)
NEXT_PUBLIC_API_URL=https://taskflow-backend-vmm3.onrender.com

# Password generation secret (optional, has default)
BACKEND_PASSWORD_SECRET=your-secret-key-here

# Google OAuth (required)
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
```

---

## 📝 Summary

1. **API Client** (`api.ts`): Handles all HTTP requests to backend
2. **Backend Auth** (`backendAuth.ts`): Bridges OAuth with JWT authentication
3. **NextAuth Config** (`auth.ts`): Integrates tokens into session
4. **Actions** (`*Actions.ts`): Server actions that use API client
5. **Flow**: Google OAuth → Backend JWT → API calls with JWT

The system seamlessly handles:

- Automatic user creation in backend
- JWT token management
- Data format conversion
- Error handling
- Session management
