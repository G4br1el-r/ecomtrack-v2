import { differenceInCalendarDays, subDays } from "date-fns";

import type { ResolvedDateRange } from "@/@types/Modules/Core/DesignSystem/date-range";

export function getPreviousPeriod({ from, to }: ResolvedDateRange): ResolvedDateRange {
  const length = differenceInCalendarDays(to, from) + 1;
  return { from: subDays(from, length), to: subDays(from, 1) };
}
