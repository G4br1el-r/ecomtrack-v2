import { format, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";

import type { DateRange } from "@/@types/Modules/Core/DesignSystem/date-range";
import {
  DATE_FORMAT,
  EMPTY_PERIOD_LABEL,
  MONTH_YEAR_FORMAT,
} from "@/constants/Modules/Core/DesignSystem/period-presets";

import { capitalize } from "./capitalize";
import { isFullMonth } from "./is-full-month";

export function formatPeriodLabel({ from, to }: DateRange): string {
  if (!from) return EMPTY_PERIOD_LABEL;
  if (!to || isSameDay(from, to)) return format(from, DATE_FORMAT);
  if (isFullMonth(from, to)) return capitalize(format(from, MONTH_YEAR_FORMAT, { locale: ptBR }));
  return `${format(from, DATE_FORMAT)} - ${format(to, DATE_FORMAT)}`;
}
