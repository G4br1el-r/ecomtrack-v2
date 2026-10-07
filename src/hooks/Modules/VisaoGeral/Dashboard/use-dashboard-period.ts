"use client";

import type { DashboardPeriodQuery } from "@/@types/Modules/VisaoGeral/Dashboard/dashboard-overview";
import { formatIsoDate } from "@/lib/Modules/Core/DesignSystem/format-iso-date";
import { useDashboardFiltersStore } from "@/store/Modules/VisaoGeral/Dashboard/dashboard-filters-store";

export function useDashboardPeriod(): DashboardPeriodQuery {
  const range = useDashboardFiltersStore((state) => state.range);
  return { from: formatIsoDate(range.from), to: formatIsoDate(range.to) };
}
