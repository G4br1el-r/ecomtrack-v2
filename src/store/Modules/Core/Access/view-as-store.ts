import { create } from "zustand";

type ViewAsSession = {
  token: string;
  expiresAt: string;
  label: string;
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
