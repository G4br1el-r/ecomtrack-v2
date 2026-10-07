"use client";

import { motion } from "motion/react";

import type { AppNotification } from "@/@types/Modules/Core/Shell/notification";
import { DURATION_FAST } from "@/constants/Modules/Core/DesignSystem/motion";
import { getEventTypeConfig } from "@/lib/Modules/Core/DesignSystem/get-event-type-config";
import { cn } from "@/lib/utils";
import { useNotificationsStore } from "@/store/Modules/Core/Shell/notifications-store";

export function NotificationItem({ notification }: { notification: AppNotification }) {
  const markAsRead = useNotificationsStore((state) => state.markAsRead);
  const config = getEventTypeConfig(notification.type);
  const Icon = config.icon;
  return (
    <li>
      <button
        type="button"
        onClick={() => markAsRead(notification.id)}
        className="flex w-full gap-3 rounded-md px-3 py-2.5 text-left transition-colors hover:bg-accent"
      >
        <span
          className={cn("mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-muted", config.colorClassName)}
        >
          <Icon className="size-3.5" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className={cn("block text-sm", notification.read ? "text-muted-foreground" : "font-medium")}>
            {notification.title}
          </span>
          <span className="block truncate text-xs text-muted-foreground">{notification.description}</span>
          <span className="mt-0.5 block text-xs text-muted-foreground/80">{notification.time}</span>
        </span>
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{ opacity: notification.read ? 0 : 1, scale: notification.read ? 0 : 1 }}
          transition={{ duration: DURATION_FAST }}
          className="mt-2 size-2 shrink-0 rounded-full bg-primary"
        />
      </button>
    </li>
  );
}
