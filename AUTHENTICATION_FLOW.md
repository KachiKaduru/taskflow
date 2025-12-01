# 🔐 TaskFlow Authentication Flow - Complete Explanation

## 📋 Overview

The authentication system uses **JWT tokens** stored in **two places**:
1. **Cookies** (for server-side Next.js actions)
2. **localStorage** (for client-side API calls)

---

## 🎯 The Big Picture

```
User fills form → Server Action → Backend API → Token received → Stored in 2 places → User redirected
```

---

## 🔄 Step-by-Step Flow

### **PART 1: USER REGISTRATION (Sign Up)**

#### Step 1: User fills out signup form
```
User enters:
- Full Name
- Email
- Password
- Confirm Password
```

#### Step 2: Form submission triggers server action
```typescript
// app/_components/AuthForm.tsx
<form action={handleSubmit}>
  // When submitted, calls: signup(formData)
</form>
```

#### Step 3: Server action processes signup
```typescript
// app/_lib/actions/authActions.ts → signup()

1. Validates form data (email, password match, etc.)
2. Calls apiClient.register() → POST /auth/create-user
3. Backend creates user account
4. Automatically logs user in: apiClient.login()
5. Backend returns: { access_token: "abc123...", token_type: "bearer" }
```

#### Step 4: Token storage (THE KEY PART!)
```typescript
// Token is stored in TWO places:

// A) In apiClient.login() - stores in localStorage (client-side)
tokenStorage.set(data.access_token)  // → localStorage

// B) In authActions.signup() - stores in cookies (server-side)
await setServerToken(authResponse.access_token)  
// → Creates 2 cookies:
//   1. taskflow_access_token (httpOnly - server only)
//   2. taskflow_access_token_client (readable by JavaScript)
```

#### Step 5: Redirect to dashboard
```typescript
redirect("/dashboard")  // User is now logged in!
```

---

### **PART 2: USER LOGIN**

#### Step 1-2: Same as signup (form → server action)

#### Step 3: Server action processes login
```typescript
// app/_lib/actions/authActions.ts → login()

1. Validates email/password
2. Calls apiClient.login(email, password)
3. Backend validates credentials
4. Backend returns: { access_token: "abc123...", token_type: "bearer" }
```

#### Step 4: Token storage (same as signup)
```typescript
// Token stored in:
// - localStorage (by apiClient.login)
// - Cookies (by setServerToken)
```

#### Step 5: Token sync (important!)
```typescript
// app/_components/AuthForm.tsx
useEffect(() => {
  syncTokenFromCookie();  // Reads cookie → copies to localStorage
}, []);

// This ensures client-side code can access the token
```

---

### **PART 3: MAKING AUTHENTICATED API CALLS**

#### Scenario A: Server-Side (Server Actions)

```typescript
// Example: Creating a task
// app/_lib/actions/taskActions.ts

export async function createTask(task: CreateTaskInput) {
  // 1. Get token from COOKIES (server-side)
  const token = await getBackendToken();  
  //    ↓
  //    Calls getServerToken() → reads from cookies
  
  // 2. Pass token to API client
  await apiClient.createTask(taskData, token);
  //    ↓
  //    Adds header: Authorization: Bearer abc123...
}
```

**Flow:**
```
Server Action → getBackendToken() → Reads cookie → Passes to API → Backend validates
```

#### Scenario B: Client-Side (React Components)

```typescript
// Example: Client component making API call
"use client";

import { apiClient } from "../_lib/apiClient";

function MyComponent() {
  const fetchTasks = async () => {
    // apiClient automatically gets token from localStorage!
    const tasks = await apiClient.getTasks();
    //    ↓
    //    Inside apiClient.request():
    //    const authToken = tokenStorage.get()  // Reads from localStorage
    //    headers["Authorization"] = `Bearer ${authToken}`
  };
}
```

**Flow:**
```
Client Component → apiClient.getTasks() → Reads localStorage → Adds token → Backend validates
```

---

## 🔑 Key Components Explained

### 1. **Token Storage System** (`app/_lib/auth/token.ts`)

```typescript
// CLIENT-SIDE (Browser)
tokenStorage.get()    // Reads from localStorage
tokenStorage.set()    // Saves to localStorage
tokenStorage.remove() // Deletes from localStorage

// SERVER-SIDE (Next.js Server)
getServerToken()      // Reads from cookies (httpOnly)
setServerToken()      // Saves to cookies (both httpOnly + readable)
removeServerToken()   // Deletes cookies

// SYNC FUNCTION
syncTokenFromCookie() // Copies cookie → localStorage (client only)
```

**Why two storage methods?**
- **Cookies**: Server actions can't access localStorage (it's browser-only)
- **localStorage**: Client components can't access httpOnly cookies easily
- **Solution**: Store in both, sync when needed

---

### 2. **API Client** (`app/_lib/apiClient.ts`)

```typescript
class ApiClient {
  // Main request method - handles authentication automatically
  private async request(endpoint, options, token?) {
    // 1. If token provided, use it
    // 2. If not provided AND client-side, get from localStorage
    // 3. Add Authorization header
    // 4. Make request
  }
  
  // Public methods
  login()      // POST /auth/token
  register()   // POST /auth/create-user
  getTasks()   // GET /tasks (with auth)
  createTask() // POST /tasks (with auth)
  // ... etc
}
```

**Smart token handling:**
- If you pass a token → uses it
- If no token + client-side → auto-reads from localStorage
- If no token + server-side → you must pass token explicitly

---

### 3. **Server Actions** (`app/_lib/actions/authActions.ts`)

```typescript
// These run on the SERVER
"use server";

export async function login(formData: FormData) {
  // 1. Call backend API
  const authResponse = await apiClient.login(email, password);
  
  // 2. Store in cookies (for server-side access)
  await setServerToken(authResponse.access_token);
  
  // 3. Redirect
  redirect("/dashboard");
}
```

**Why server actions?**
- Secure (credentials never exposed to client)
- Can set cookies directly
- Can redirect after login

---

## 🔄 Complete Flow Diagram

### **SIGNUP FLOW:**
```
┌─────────────┐
│ User Form   │
└──────┬──────┘
       │ submits
       ▼
┌──────────────────┐
│ authActions.signup│ (Server Action)
└──────┬───────────┘
       │
       ├─→ apiClient.register() → POST /auth/create-user
       │
       ├─→ apiClient.login() → POST /auth/token
       │                        ↓
       │                   { access_token: "..." }
       │                        ↓
       ├─→ tokenStorage.set() → localStorage ✅
       │
       └─→ setServerToken() → cookies ✅
                                ↓
                          redirect("/dashboard")
```

### **LOGIN FLOW:**
```
┌─────────────┐
│ User Form   │
└──────┬──────┘
       │ submits
       ▼
┌──────────────────┐
│ authActions.login │ (Server Action)
└──────┬───────────┘
       │
       ├─→ apiClient.login() → POST /auth/token
       │                        ↓
       │                   { access_token: "..." }
       │                        ↓
       ├─→ tokenStorage.set() → localStorage ✅
       │
       └─→ setServerToken() → cookies ✅
                                ↓
                          redirect("/dashboard")
                                ↓
                    AuthForm useEffect runs
                                ↓
                    syncTokenFromCookie() → ensures localStorage has token
```

### **MAKING API CALLS:**

**Server Action:**
```
┌─────────────────┐
│ createTask()    │ (Server Action)
└────────┬────────┘
         │
         ├─→ getBackendToken() → reads cookie
         │                        ↓
         │                   token: "abc123"
         │                        ↓
         └─→ apiClient.createTask(data, token)
                              ↓
                    Adds: Authorization: Bearer abc123
                              ↓
                    POST /tasks → Backend validates ✅
```

**Client Component:**
```
┌─────────────────┐
│ MyComponent     │ (Client Component)
└────────┬────────┘
         │
         └─→ apiClient.getTasks()
                      ↓
            Reads from localStorage
                      ↓
            token: "abc123"
                      ↓
            Adds: Authorization: Bearer abc123
                      ↓
            GET /tasks → Backend validates ✅
```

---

## 🎯 Why This Design?

1. **Security**: Credentials handled server-side only
2. **Flexibility**: Works for both server actions AND client components
3. **Persistence**: Token survives page refreshes (cookies + localStorage)
4. **Automatic**: API client handles token injection automatically

---

## 🐛 Common Issues & Solutions

### Issue: "Token not found" error
**Cause**: Token not in localStorage or cookies
**Solution**: Make sure `syncTokenFromCookie()` runs after login

### Issue: Server action can't find token
**Cause**: Cookie not set properly
**Solution**: Check `setServerToken()` was called after login

### Issue: Client API call fails
**Cause**: Token not in localStorage
**Solution**: Ensure `tokenStorage.set()` was called (happens in `apiClient.login()`)

---

## 📝 Quick Reference

| Where | Token Source | How to Access |
|-------|-------------|---------------|
| Server Action | Cookie | `await getBackendToken()` |
| Client Component | localStorage | `apiClient` auto-reads it |
| After Login | Both | `setServerToken()` + `tokenStorage.set()` |

---

## ✅ Summary

1. **Login/Signup** → Token received from backend
2. **Token stored** → localStorage (client) + cookies (server)
3. **API calls** → Token automatically added to requests
4. **Backend validates** → Token in Authorization header
5. **User authenticated** → Can access protected resources

The magic is in the **dual storage system** - cookies for server, localStorage for client, both synced! 🎉

