import { create } from "zustand";

import type { AppNotification } from "@/@types/Modules/Core/Shell/notification";
import { INITIAL_NOTIFICATIONS } from "@/constants/Modules/Core/Shell/notifications";

type NotificationsState = {
  notifications: AppNotification[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
};

export const useNotificationsStore = create<NotificationsState>()((set) => ({
  notifications: INITIAL_NOTIFICATIONS,
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((item) => (item.id === id ? { ...item, read: true } : item)),
    })),
  markAllAsRead: () =>
    set((state) => ({ notifications: state.notifications.map((item) => ({ ...item, read: true })) })),
}));
