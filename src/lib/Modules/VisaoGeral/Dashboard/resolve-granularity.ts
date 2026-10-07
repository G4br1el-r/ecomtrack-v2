import { differenceInCalendarDays } from "date-fns";

import type { ResolvedDateRange } from "@/@types/Modules/Core/DesignSystem/date-range";
import type { Granularity } from "@/@types/Modules/VisaoGeral/Dashboard/granularity";
import {
  DAILY_GRANULARITY_MAX_DAYS,
  WEEKLY_GRANULARITY_MAX_DAYS,
} from "@/constants/Modules/VisaoGeral/Dashboard/granularity";

export function resolveGranularity({ from, to }: ResolvedDateRange): Granularity {
  const length = differenceInCalendarDays(to, from) + 1;
  if (length <= DAILY_GRANULARITY_MAX_DAYS) return "day";
  if (length <= WEEKLY_GRANULARITY_MAX_DAYS) return "week";
  return "month";
}
