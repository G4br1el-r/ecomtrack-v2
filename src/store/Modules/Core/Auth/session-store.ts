import { create } from "zustand";

import type { AuthTokens } from "@/schemas/Modules/Core/Auth/auth-tokens-schema";
import type { CurrentUser } from "@/schemas/Modules/Core/Auth/current-user-schema";

type SessionState = {
  accessToken: string | null;
  user: CurrentUser | null;
  setSession: (tokens: AuthTokens) => void;
  setUser: (user: CurrentUser) => void;
  clearSession: () => void;
};

export const useSessionStore = create<SessionState>()((set) => ({
  accessToken: null,
  user: null,
  setSession: ({ accessToken, user }) => set({ accessToken, user }),
  setUser: (user) => set({ user }),
  clearSession: () => set({ accessToken: null, user: null }),
}));
