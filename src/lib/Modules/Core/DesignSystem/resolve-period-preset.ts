import {
  addDays,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subMonths,
} from "date-fns";

import type { PeriodPresetId, ResolvedDateRange } from "@/@types/Modules/Core/DesignSystem/date-range";
import {
  ALL_TIME_START,
  LAST_7_DAYS_OFFSET,
  LAST_30_DAYS_OFFSET,
  LAST_90_DAYS_OFFSET,
  ONE_MONTH,
  WEEK_STARTS_ON_MONDAY,
  YESTERDAY_OFFSET,
} from "@/constants/Modules/Core/DesignSystem/period-presets";

export function resolvePeriodPreset(id: PeriodPresetId, now: Date): ResolvedDateRange {
  const today = startOfDay(now);
  switch (id) {
    case "ultimos-90":
      return { from: addDays(today, LAST_90_DAYS_OFFSET), to: today };
    case "ultimos-30":
      return { from: addDays(today, LAST_30_DAYS_OFFSET), to: today };
    case "ultimos-7":
      return { from: addDays(today, LAST_7_DAYS_OFFSET), to: today };
    case "ontem":
      return { from: addDays(today, YESTERDAY_OFFSET), to: addDays(today, YESTERDAY_OFFSET) };
    case "hoje":
      return { from: today, to: today };
    case "esta-semana":
      return {
        from: startOfWeek(today, { weekStartsOn: WEEK_STARTS_ON_MONDAY }),
        to: startOfDay(endOfWeek(today, { weekStartsOn: WEEK_STARTS_ON_MONDAY })),
      };
    case "este-mes":
      return { from: startOfMonth(today), to: startOfDay(endOfMonth(today)) };
    case "mes-passado": {
      const previous = subMonths(today, ONE_MONTH);
      return { from: startOfMonth(previous), to: startOfDay(endOfMonth(previous)) };
    }
    case "este-ano":
      return { from: startOfYear(today), to: startOfDay(endOfYear(today)) };
    case "todo-o-periodo":
      return { from: new Date(ALL_TIME_START.year, ALL_TIME_START.monthIndex, ALL_TIME_START.day), to: today };
  }
}
