// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://abezmyqrpezuauzjxlwo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiZXpteXFycGV6dWF1emp4bHdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMDIyMzAsImV4cCI6MjA1MDc3ODIzMH0.5K4PJ8Ymjy-K7snGjzipAXqxlH7lYFZPBOT3FMj7f9w";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);