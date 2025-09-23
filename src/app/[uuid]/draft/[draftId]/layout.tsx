"use client";

import React, { useState, useEffect } from "react";
import TopNavBar from "@/components/TopNavBar";
import SideNavBar from "@/components/SideNavBar";
import AISidebar from "@/components/AISideBar";
import client from "@/lib/supabase";

interface DraftLayoutProps {
  children: React.ReactNode;
}

export default function DraftLayout({ children }: DraftLayoutProps) {
  const [expanded, setExpanded] = useState(false); // left sidebar
  const [aiOpen, setAiOpen] = useState(true); // AI sidebar
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
    <div className="flex flex-col h-screen">
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopNavBar />
      </div>

      <div className="flex flex-1 pt-16"> {/* pt-16 to account for top nav height */}
        {/* Left Side Navbar */}
        <SideNavBar expanded={expanded} setExpanded={setExpanded} uuid={uuid} />

        {/* Main content area */}
        <div
          className="flex-1 h-full overflow-y-auto transition-all duration-300"
          style={{
            marginLeft: expanded ? 200 : 30,
            marginRight: aiOpen ? 319 : 48, // account for AI sidebar width
          }}
        >
          {children}
        </div>

        {/* AI Sidebar */}
        <AISidebar isOpen={aiOpen} setIsOpen={setAiOpen} topBarHeight={64} />
      </div>
    </div>
  );
}
