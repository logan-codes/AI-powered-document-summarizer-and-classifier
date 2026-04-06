"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase";
import { Menu } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

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

  const { isMobileMenuOpen, setMobileMenuOpen } = useAppStore();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow px-4 lg:px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Menu (only show inside dashboard) */}
        {isInsideUuid && (
          <button
            className="lg:hidden p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        )}
        {/* Website Name */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          Legal AI
        </Link>
      </div>

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
