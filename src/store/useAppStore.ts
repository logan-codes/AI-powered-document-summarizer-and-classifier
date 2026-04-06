import { create } from 'zustand';

interface AppState {
  isSidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
  isSidebarPinned: boolean;
  setSidebarPinned: (pinned: boolean) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  uuid: string | null;
  setUuid: (uuid: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isSidebarExpanded: false,
  setSidebarExpanded: (expanded) => set({ isSidebarExpanded: expanded }),
  isSidebarPinned: false,
  setSidebarPinned: (pinned) => set({ isSidebarPinned: pinned }),
  isMobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  uuid: null,
  setUuid: (uuid) => set({ uuid }),
}));
