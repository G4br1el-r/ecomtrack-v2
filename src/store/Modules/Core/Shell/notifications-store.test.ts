import { beforeEach, describe, expect, it } from "vitest";

import { INITIAL_NOTIFICATIONS } from "@/constants/Modules/Core/Shell/notifications";

import { useNotificationsStore } from "./notifications-store";

describe("useNotificationsStore", () => {
  beforeEach(() => {
    useNotificationsStore.setState({ notifications: INITIAL_NOTIFICATIONS });
  });

  it("marca uma notificação como lida", () => {
    useNotificationsStore.getState().markAsRead("n1");
    expect(useNotificationsStore.getState().notifications.find((item) => item.id === "n1")?.read).toBe(true);
    expect(useNotificationsStore.getState().notifications.find((item) => item.id === "n2")?.read).toBe(false);
  });

  it("marca todas como lidas", () => {
    useNotificationsStore.getState().markAllAsRead();
    expect(useNotificationsStore.getState().notifications.every((item) => item.read)).toBe(true);
  });
});
