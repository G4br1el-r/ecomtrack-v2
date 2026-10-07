import { isSameDay, parseISO, subDays } from "date-fns";

import type { ActivityDay } from "@/@types/Modules/Administracao/Usuarios/activity-day";
import { AUDIT_TYPE_META } from "@/constants/Modules/Administracao/Auditoria/audit";
import { formatDisplayDate } from "@/lib/Modules/Core/DesignSystem/format-display-date";
import { formatDisplayTime } from "@/lib/Modules/Core/DesignSystem/format-display-time";
import type { UserActivity } from "@/schemas/Modules/Administracao/Usuarios/user-activity-page-schema";

export function groupActivityByDay(activities: UserActivity[], now: Date): ActivityDay[] {
  const days = new Map<string, ActivityDay>();
  for (const activity of activities) {
    const date = parseISO(activity.createdAt);
    const label = isSameDay(date, now)
      ? "Hoje"
      : isSameDay(date, subDays(now, 1))
        ? "Ontem"
        : formatDisplayDate(activity.createdAt);
    const meta = AUDIT_TYPE_META[activity.type];
    const details = [formatDisplayTime(activity.createdAt), activity.summary, activity.ip ? `IP ${activity.ip}` : null];
    const day = days.get(label) ?? { label, events: [] };
    day.events.push({
      id: activity.id,
      type: activity.type,
      description: activity.label ?? meta.label,
      meta: details.filter(Boolean).join(" · "),
      icon: meta.icon,
    });
    days.set(label, day);
  }
  return [...days.values()];
}
