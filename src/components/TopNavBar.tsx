"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase";

export default function TopNavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/"); // Redirect after logout
  };

  const isInsideUuid =
    pathname.startsWith("/") && pathname.split("/")[1]?.length === 36; // crude UUID check

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow px-6 py-3 flex justify-between items-center">
      {/* Website Name */}
      <Link href="/" className="text-xl font-bold text-blue-600">
        Legal AI
      </Link>

      {/* Right Side Buttons */}
      <div className="flex gap-2">
        {isInsideUuid ? (
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        ) : pathname.includes("/login") ? (
          <Link href="/signup">
            <Button variant="default">Sign Up</Button>
          </Link>
        ) : pathname.includes("/signup") ? (
          <Link href="/login">
            <Button variant="default">Login</Button>
          </Link>
        ) : (
          <>
            <Link href="/login">
              <Button variant="default">Login</Button>
            </Link>
            <Link href="/signup">
              <Button variant="secondary">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
