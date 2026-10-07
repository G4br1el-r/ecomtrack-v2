import { create } from "zustand";

import type { UsersPanel } from "@/@types/Modules/Administracao/Usuarios/users-panel";

type UsersPanelState = {
  panel: UsersPanel | null;
  isOpen: boolean;
  open: (panel: UsersPanel) => void;
  close: () => void;
};

export const useUsersPanelStore = create<UsersPanelState>()((set) => ({
  panel: null,
  isOpen: false,
  open: (panel) => set({ panel, isOpen: true }),
  close: () => set({ isOpen: false }),
}));
