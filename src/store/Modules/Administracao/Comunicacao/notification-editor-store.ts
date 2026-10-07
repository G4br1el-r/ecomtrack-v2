import { create } from "zustand";

import type { NotificationSummary } from "@/schemas/Modules/Administracao/Comunicacao/notification-summary-schema";

type NotificationEditorState = {
  notification: NotificationSummary | null;
  isOpen: boolean;
  open: (notification: NotificationSummary) => void;
  close: () => void;
};

export const useNotificationEditorStore = create<NotificationEditorState>()((set) => ({
  notification: null,
  isOpen: false,
  open: (notification) => set({ notification, isOpen: true }),
  close: () => set({ isOpen: false }),
}));
