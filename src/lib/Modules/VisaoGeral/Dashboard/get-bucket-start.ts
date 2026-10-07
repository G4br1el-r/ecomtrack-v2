import { parseISO, startOfMonth, startOfWeek } from "date-fns";

import type { Granularity } from "@/@types/Modules/VisaoGeral/Dashboard/granularity";
import { WEEK_STARTS_ON_MONDAY } from "@/constants/Modules/Core/DesignSystem/period-presets";
import { formatIsoDate } from "@/lib/Modules/Core/DesignSystem/format-iso-date";

export function getBucketStart(isoDate: string, granularity: Granularity): string {
  if (granularity === "day") return isoDate;
  const date = parseISO(isoDate);
  const start =
    granularity === "week" ? startOfWeek(date, { weekStartsOn: WEEK_STARTS_ON_MONDAY }) : startOfMonth(date);
  return formatIsoDate(start);
}
