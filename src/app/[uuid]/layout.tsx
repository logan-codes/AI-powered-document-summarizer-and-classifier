"use client";

import SideNavBar from "@/components/SideNavBar";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const [uuid, setUuid] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (!user || error) {
        window.location.href = "/login";
      } else {
        setUuid(user.id);
      }
    };
    fetchUser();
  }, [supabase]);

  if (!uuid) return <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">Loading dashboard...</div>;

  return (
    <div className="flex flex-1">
      {/* Side Navbar */}
      <SideNavBar expanded={expanded} setExpanded={setExpanded} uuid={uuid} />

      {/* Content area */}
      <div
        className="flex-1 overflow-y-auto transition-all duration-300"
        style={{ 
          marginLeft: expanded ? 240 : 64,
          height: `calc(100vh - 64px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
