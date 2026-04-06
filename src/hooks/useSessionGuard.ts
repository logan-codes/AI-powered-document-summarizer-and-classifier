"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { toast } from "sonner";

const SESSION_DURATION_MS = 60 * 60 * 1000; // 60 minutes
const CHECK_INTERVAL_MS  = 30 * 1000;        // check every 30 seconds

/**
 * Decode the JWT payload WITHOUT verifying the signature
 * (verification is done server-side by Supabase).
 * Returns the `iat` (issued-at) Unix timestamp in milliseconds.
 */
function getJwtIatMs(token: string): number | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return typeof decoded.iat === "number" ? decoded.iat * 1000 : null;
  } catch {
    return null;
  }
}

export function useSessionGuard() {
  const router   = useRouter();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // No session — redirect to login
        router.replace("/login");
        return;
      }

      const iatMs   = getJwtIatMs(session.access_token);
      const elapsed = iatMs ? Date.now() - iatMs : null;

      if (!elapsed || elapsed >= SESSION_DURATION_MS) {
        clearInterval(timerRef.current!);
        toast.info("Your session has expired. Please log in again.", { duration: 4000 });
        await supabase.auth.signOut();
        // Brief pause so the toast is visible before navigation
        setTimeout(() => router.replace("/login?reason=session_expired"), 1200);
      }
    };

    // Run immediately, then every 30 seconds
    checkSession();
    timerRef.current = setInterval(checkSession, CHECK_INTERVAL_MS);

    // Cleanup interval on unmount
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
