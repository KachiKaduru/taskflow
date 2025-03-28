// import { createBrowserClient } from "@supabase/ssr";

// export function createClient() {
//   return createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
//   );
// }

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // Check if we're in the browser environment
  const isBrowser = typeof window !== "undefined";

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          if (!isBrowser) return undefined;
          const value = document.cookie
            .split("; ")
            .find((row) => row.startsWith(`${name}=`))
            ?.split("=")[1];
          return value;
        },
        set(name, value, options = {}) {
          if (!isBrowser) return;
          const optionsStr = Object.entries(options)
            .map(([key, val]) => `${key}=${val}`)
            .join("; ");
          document.cookie = `${name}=${value}; ${optionsStr}`;
        },
        remove(name, options = {}) {
          if (!isBrowser) return;
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; ${Object.entries(
            options
          )
            .map(([key, val]) => `${key}=${val}`)
            .join("; ")}`;
        },
      },
    }
  );
}
