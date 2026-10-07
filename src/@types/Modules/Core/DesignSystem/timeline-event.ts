import type { LucideIcon } from "lucide-react";

export type TimelineEvent = {
  id: string;
  type: string;
  description: string;
  meta: string;
  author?: string;
  icon?: LucideIcon;
};
