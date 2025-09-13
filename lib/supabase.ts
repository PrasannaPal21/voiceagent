import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://awtaamzklraziofgjqvz.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3dGFhbXprbHJhemlvZmdqcXZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2NzI4MzgsImV4cCI6MjA3MzI0ODgzOH0.0-s_FgNtxqlyaiEVsb4GvPs-iY0y64iPGHD3-WKmL_8";

// Only create the client if we have valid environment variables
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;




