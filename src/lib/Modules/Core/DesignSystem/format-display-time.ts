import { format, parseISO } from "date-fns";

import { TIME_FORMAT } from "@/constants/Modules/Core/DesignSystem/date-format";

export function formatDisplayTime(isoDate: string): string {
  return format(parseISO(isoDate), TIME_FORMAT);
}
