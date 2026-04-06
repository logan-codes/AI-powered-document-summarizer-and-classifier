import { createClient as createBrowserClient } from './supabase/client';

export const createClient = createBrowserClient;

export const createServerSupabaseClient = () => {
  throw new Error(
    'createServerSupabaseClient must be imported from "@/lib/supabase/server" to ensure it is only used on the server.'
  );
};
