const TOKEN_KEY = "taskflow_access_token";

/**
 * Client-side token storage using localStorage
 */
export const tokenStorage = {
  get: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  set: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
  },

  remove: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
  },
};

/**
 * Server-side token storage using cookies
 * For use in server actions
 */
export async function getServerToken(): Promise<string | null> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_KEY)?.value || null;
}

export async function setServerToken(token: string): Promise<void> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();

  // Set httpOnly cookie for server-side access
  cookieStore.set(TOKEN_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours (matching backend token expiration)
  });

  // Also set a non-httpOnly cookie for client-side access
  // This allows client-side JavaScript to read and sync to localStorage
  cookieStore.set(`${TOKEN_KEY}_client`, token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
  });
}

export async function removeServerToken(): Promise<void> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_KEY);
  cookieStore.delete(`${TOKEN_KEY}_client`);
}

/**
 * Client-side function to sync token from cookie to localStorage
 * Call this after login/signup to ensure client-side API calls work
 */
export function syncTokenFromCookie(): void {
  if (typeof window === "undefined") return;

  // Read token from non-httpOnly cookie
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith(`${TOKEN_KEY}_client=`));

  if (tokenCookie) {
    const token = tokenCookie.split("=")[1];
    if (token) {
      tokenStorage.set(token);
    }
  }
}
