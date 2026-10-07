import type { LucideIcon } from "lucide-react";

import type { EVENT_TYPES } from "@/constants/Modules/Core/DesignSystem/event-types";

export type EventTypeConfig = {
  icon: LucideIcon;
  colorClassName: string;
  label: string;
  usage: string;
};

export type EventType = keyof typeof EVENT_TYPES;
