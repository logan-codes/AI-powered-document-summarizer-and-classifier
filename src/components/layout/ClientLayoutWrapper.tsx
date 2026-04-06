"use client";

import React from "react";
import SideNavBar from "@/components/SideNavBar";
import { useAppStore } from "@/store/useAppStore";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isSidebarExpanded, isMobileMenuOpen, setMobileMenuOpen } = useAppStore();

  return (
    <div className="flex flex-1">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 top-[64px] bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Side Navbar */}
      <SideNavBar />

      {/* Content area */}
      <div
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSidebarExpanded ? "lg:ml-[240px]" : "lg:ml-[64px]"
        }`}
        style={{ 
          height: `calc(100vh - 64px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
