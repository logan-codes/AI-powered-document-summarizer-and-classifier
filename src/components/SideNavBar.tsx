"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, FileText, Settings, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

import { useAppStore } from "@/store/useAppStore";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
}

export default function SideNavBar() {
  const { isSidebarExpanded, setSidebarExpanded, isMobileMenuOpen, uuid } = useAppStore();
  const router = useRouter();
  const supabase = createClient();

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
    } = await supabase.auth.getUser();

    if (authError || !user) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
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
      className={`fixed left-0 flex flex-col justify-between bg-[#f7f9fc] border-r transition-transform duration-300 group z-40 ${
        isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
      }`}
      onMouseEnter={() => setSidebarExpanded(true)}
      onMouseLeave={() => setSidebarExpanded(false)}
      style={{
        top: "64px",
        height: "calc(100vh - 64px)",
        width: isSidebarExpanded || isMobileMenuOpen ? "240px" : "64px",
      }}
    >
      {/* Top Section */}
      <div className="flex flex-col mt-4 space-y-1">
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={() => item.path && router.push(item.path)}
            className={`flex items-center cursor-pointer gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors ${
              isSidebarExpanded || isMobileMenuOpen ? "justify-start" : "justify-center"
            }`}
          >
            <span className="text-gray-700">{item.icon}</span>
            {(isSidebarExpanded || isMobileMenuOpen) && (
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
            !(isSidebarExpanded || isMobileMenuOpen) ? "px-0" : ""
          }`}
        >
          <Plus size={18} className={!(isSidebarExpanded || isMobileMenuOpen) ? "" : "mr-2"} />
          {(isSidebarExpanded || isMobileMenuOpen) && "New Case"}
        </Button>
      </div>
    </div>
  );
}
