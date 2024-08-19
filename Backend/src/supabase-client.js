import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client
export const supabase = createClient(
  process.env.SUPABASE_URL, 
  process.env.SUPABASE_SERVICE_KEY // Use the service key for server-side operations
);

