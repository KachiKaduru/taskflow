import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    flowType: "pkce", // Required for Next.js middleware
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
