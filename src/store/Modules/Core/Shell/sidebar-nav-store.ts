import { create } from "zustand";

import type { PendingNavigation } from "@/@types/Modules/Core/Shell/navigation";

type SidebarNavState = {
  pending: PendingNavigation | null;
  setPending: (pending: PendingNavigation) => void;
  clearStale: (pathname: string) => void;
};

export const useSidebarNavStore = create<SidebarNavState>()((set) => ({
  pending: null,
  setPending: (pending) => set({ pending }),
  clearStale: (pathname) =>
    set((state) => (state.pending && state.pending.from !== pathname ? { pending: null } : state)),
}));
