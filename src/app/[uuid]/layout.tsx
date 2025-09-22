"use client";

import { Geist, Geist_Mono } from "next/font/google";
import TopNavBar from "@/components/TopNavBar";
import SideNavBar from "@/components/SideNavBar";
import { useState, useEffect } from "react";
import client from "@/lib/supabase";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const [uuid, setUuid] = useState<string | null>(null);

  // Fetch logged-in user UUID
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await client.auth.getUser();
      if (!user || error) {
        window.location.href = "/login";
      } else {
        setUuid(user.id);
      }
    };
    fetchUser();
  }, []);

  if (!uuid) return <div>Loading...</div>;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Toast notifications */}
        <Toaster position="top-right" richColors />

        <div className="flex flex-col h-screen">
          {/* Top Navbar */}
          <div className="fixed top-0 left-0 right-0 z-50">
            <TopNavBar />
          </div>

          <div className="flex flex-1">
            {/* Side Navbar */}
            <SideNavBar expanded={expanded} setExpanded={setExpanded} uuid={uuid} />

            {/* Content area */}
            <div
              className="flex-1 h-full overflow-y-auto transition-all duration-300"
              style={{ marginLeft: expanded ? 240 : 64 }}
            >
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
