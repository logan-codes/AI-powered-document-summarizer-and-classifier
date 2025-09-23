import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

function ensureClient(): SupabaseClient {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error('Supabase client requested but env vars are missing');
  }
  _client = createClient(url, anonKey);
  return _client;
}

// Lazy proxy to avoid touching env at import time during Next build
const client = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const real = ensureClient();
    // @ts-expect-error dynamic access on SupabaseClient
    return real[prop];
  },
});

export default client;
export { ensureClient as getSupabaseClient };