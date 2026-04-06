"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, FileText, Settings, Plus, PanelLeft, PanelLeftClose } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

import { useAppStore } from "@/store/useAppStore";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
}

export default function SideNavBar() {
  const { isSidebarExpanded, setSidebarExpanded, isSidebarPinned, setSidebarPinned, isMobileMenuOpen, uuid } = useAppStore();
  const isExpanded = isSidebarExpanded || isSidebarPinned || isMobileMenuOpen;
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
      className={`fixed left-0 flex flex-col justify-between bg-sidebar border-r border-sidebar-border transition-transform duration-300 group z-40 ${
        isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
      }`}
      onMouseEnter={() => !isSidebarPinned && setSidebarExpanded(true)}
      onMouseLeave={() => !isSidebarPinned && setSidebarExpanded(false)}
      style={{
        top: "64px",
        height: "calc(100vh - 64px)",
        width: isExpanded ? "240px" : "64px",
      }}
    >
      {/* Top Section */}
      <div className="flex flex-col mt-4 space-y-1">
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={() => item.path && router.push(item.path)}
            className={`flex items-center cursor-pointer gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors ${
              isExpanded ? "justify-start" : "justify-center"
            }`}
          >
            <span className="text-sidebar-foreground/80">{item.icon}</span>
            {isExpanded && (
              <span className="text-sm font-medium text-sidebar-foreground">
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
          className={`bg-primary hover:bg-primary/90 text-primary-foreground w-full justify-center px-0 overflow-hidden shadow-sm ${
            isExpanded ? "px-4" : ""
          }`}
        >
          <div className="flex items-center justify-center">
            <Plus size={18} className={isExpanded ? "mr-2 flex-shrink-0" : "flex-shrink-0"} />
            {isExpanded && <span className="whitespace-nowrap">New Case</span>}
          </div>
        </Button>
      </div>
    </div>
  );
}
