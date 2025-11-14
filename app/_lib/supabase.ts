/**
 * @deprecated This file is deprecated. The application now uses the FastAPI backend
 * at https://taskflow-backend-vmm3.onrender.com/ instead of Supabase.
 *
 * All Supabase calls have been replaced with API calls to the backend.
 * This file is kept for reference but should not be used in new code.
 *
 * See app/_lib/api.ts for the new API client.
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  // Don't throw error anymore since we're not using Supabase
  console.warn("Supabase environment variables are not set, but Supabase is deprecated.");
}

export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;
