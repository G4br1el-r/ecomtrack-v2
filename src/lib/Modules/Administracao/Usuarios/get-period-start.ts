import { startOfDay, subDays } from "date-fns";

export function getPeriodStart(days: number | null, now: Date): string | undefined {
  return days === null ? undefined : startOfDay(subDays(now, days)).toISOString();
}
