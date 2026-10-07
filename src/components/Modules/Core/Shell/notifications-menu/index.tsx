"use client";

import { Bell } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/animate-ui/components/radix/popover";
import { Button } from "@/components/ui/button";
import { POP_SCALE, SPRING_SNAPPY } from "@/constants/Modules/Core/DesignSystem/motion";
import { useNotificationsStore } from "@/store/Modules/Core/Shell/notifications-store";

import { NotificationItem } from "../notification-item";

export function NotificationsMenu() {
  const notifications = useNotificationsStore((state) => state.notifications);
  const markAllAsRead = useNotificationsStore((state) => state.markAllAsRead);
  const unread = notifications.filter((item) => !item.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="relative" aria-label={`Notificações (${unread} não lidas)`}>
          <Bell aria-hidden="true" />
          <AnimatePresence>
            {unread > 0 ? (
              <motion.span
                key="badge"
                initial={{ scale: POP_SCALE, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={SPRING_SNAPPY}
                className="absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-destructive px-1 text-2xs font-semibold text-destructive-foreground tabular-nums"
              >
                {unread}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-3 py-2.5">
          <p className="text-sm font-semibold">Notificações</p>
          <Button variant="ghost" size="xs" disabled={unread === 0} onClick={markAllAsRead}>
            Marcar todas como lidas
          </Button>
        </div>
        <ul className="max-h-80 overflow-y-auto p-1">
          {notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
