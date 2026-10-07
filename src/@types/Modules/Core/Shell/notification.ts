import type { EventType } from "@/@types/Modules/Core/DesignSystem/event-type";

export type AppNotification = {
  id: string;
  type: EventType;
  title: string;
  description: string;
  time: string;
  read: boolean;
};
