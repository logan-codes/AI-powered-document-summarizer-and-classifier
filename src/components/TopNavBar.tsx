"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase";
import { Menu, PanelLeft, PanelLeftClose, Moon, Sun } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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

  const { isMobileMenuOpen, setMobileMenuOpen, isSidebarPinned, setSidebarPinned } = useAppStore();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border shadow-sm px-4 lg:px-6 py-3 flex justify-between items-center transition-colors">
      <div className="flex items-center gap-3">
        {/* Mobile & Desktop Navigation Toggles (only show inside dashboard) */}
        {isInsideUuid && (
          <div className="flex items-center">
            <button
              className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              title="Toggle Menu"
            >
              <Menu size={24} />
            </button>
            <button
              className="hidden lg:flex p-2 -ml-2 text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
              onClick={() => setSidebarPinned(!isSidebarPinned)}
              title={isSidebarPinned ? "Unpin Sidebar" : "Pin Sidebar"}
            >
              {isSidebarPinned ? <PanelLeftClose size={22} /> : <PanelLeft size={22} />}
            </button>
          </div>
        )}
        {/* Website Name */}
        <Link href="/" className="text-xl font-bold tracking-tight text-primary">
          Legal AI
        </Link>
      </div>

      {/* Right Side Buttons */}
      <div className="flex items-center gap-3">
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            title="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}
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
