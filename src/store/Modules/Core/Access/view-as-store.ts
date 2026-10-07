import { create } from "zustand";

import type { ProfilePermissions } from "@/schemas/Modules/Core/Access/profile-permissions-schema";

type ViewAsSession = {
  token: string;
  expiresAt: string;
  label: string;
  permissions: ProfilePermissions;
};

type ViewAsState = {
  session: ViewAsSession | null;
  start: (session: ViewAsSession) => void;
  stop: () => void;
};

export const useViewAsStore = create<ViewAsState>()((set) => ({
  session: null,
  start: (session) => set({ session }),
  stop: () => set({ session: null }),
}));
