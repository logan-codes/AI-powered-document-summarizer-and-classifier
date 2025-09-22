"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, FileText, Settings, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import client from "@/lib/supabase";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
}

interface SideNavBarProps {
  expanded: boolean;
  setExpanded: (val: boolean) => void;
  uuid: string; // ✅ pass uuid here
}

export default function SideNavBar({ expanded, setExpanded, uuid }: SideNavBarProps) {
  const router = useRouter();

  const navItems: NavItem[] = [
    { label: "Home", icon: <Home size={20} />, path: `/${uuid}` },
    { label: "Search", icon: <Search size={20} />, path: `/${uuid}/search` },
    { label: "Template", icon: <FileText size={20} />, path: `/${uuid}/templates` },
    { label: "Settings", icon: <Settings size={20} />, path: `/${uuid}/settings` },
  ];

  const handleNewDraft = async () => {
    const {
      data: { user },
      error: authError,
    } = await client.auth.getUser();

    if (authError || !user) {
      router.push("/login");
      return;
    }

    const { data, error } = await client
      .from("drafts")
      .insert({
        user_id: user.id,
        title: "Untitled Document",
        content: "",
      })
      .select()
      .single();

    if (error) {
      console.error("Failed to create draft:", error.message);
      return;
    }

    router.push(`/${uuid}/draft/${data.id}`);
  };

  return (
    <div
      className="fixed left-0 flex flex-col justify-between bg-[#f7f9fc] border-r transition-all duration-300 group z-40"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        top: "64px",
        height: "calc(100vh - 64px)",
        width: expanded ? "240px" : "64px",
      }}
    >
      {/* Top Section */}
      <div className="flex flex-col mt-4 space-y-1">
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={() => item.path && router.push(item.path)}
            className={`flex items-center cursor-pointer gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors ${
              expanded ? "justify-start" : "justify-center"
            }`}
          >
            <span className="text-gray-700">{item.icon}</span>
            {expanded && (
              <span className="text-sm font-medium text-[#0c141c]">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col gap-3 p-4">
        <Button
          onClick={handleNewDraft}
          className={`bg-[#197fe5] hover:bg-blue-700 text-white w-full justify-center ${
            !expanded ? "px-0" : ""
          }`}
        >
          <Plus size={18} className={!expanded ? "" : "mr-2"} />
          {expanded && "New Case"}
        </Button>
      </div>
    </div>
  );
}
