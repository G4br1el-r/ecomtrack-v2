import { format, parseISO } from "date-fns";

import { EMPTY_VALUE } from "@/constants/Modules/Core/DesignSystem/number-format";
import { DATE_FORMAT } from "@/constants/Modules/Core/DesignSystem/period-presets";

export function formatDisplayDate(isoDate: string | null): string {
  return isoDate ? format(parseISO(isoDate), DATE_FORMAT) : EMPTY_VALUE;
}
