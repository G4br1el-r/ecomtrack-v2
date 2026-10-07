import { format } from "date-fns";

import { ISO_DATE_FORMAT } from "@/constants/Modules/Core/DesignSystem/date-format";

export function formatIsoDate(date: Date): string {
  return format(date, ISO_DATE_FORMAT);
}
