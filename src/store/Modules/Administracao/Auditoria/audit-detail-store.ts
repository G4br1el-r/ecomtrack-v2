import { create } from "zustand";

type AuditDetailState = {
  logId: string | null;
  isOpen: boolean;
  open: (logId: string) => void;
  close: () => void;
};

export const useAuditDetailStore = create<AuditDetailState>()((set) => ({
  logId: null,
  isOpen: false,
  open: (logId) => set({ logId, isOpen: true }),
  close: () => set({ isOpen: false }),
}));
