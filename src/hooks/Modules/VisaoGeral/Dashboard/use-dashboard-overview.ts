"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { DASHBOARD_OVERVIEW_QUERY_KEY } from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";
import { getDashboardOverview } from "@/services/Modules/VisaoGeral/Dashboard/get-dashboard-overview";
import { useDashboardFiltersStore } from "@/store/Modules/VisaoGeral/Dashboard/dashboard-filters-store";
import { useDashboardPeriod } from "./use-dashboard-period";

export function useDashboardOverview() {
  const period = useDashboardPeriod();
  const granularity = useDashboardFiltersStore((state) => state.granularity);
  const query = { ...period, granularity };
  return useQuery({
    ...QUERY_CACHE_POLICY.panel,
    queryKey: [...DASHBOARD_OVERVIEW_QUERY_KEY, query],
    queryFn: () => getDashboardOverview(query),
    placeholderData: keepPreviousData,
  });
}
