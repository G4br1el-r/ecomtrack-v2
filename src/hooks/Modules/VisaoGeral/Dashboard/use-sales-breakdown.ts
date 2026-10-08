"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { DASHBOARD_BREAKDOWN_QUERY_KEY } from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";
import { getSalesBreakdown } from "@/services/Modules/VisaoGeral/Dashboard/get-sales-breakdown";
import { useDashboardPeriod } from "./use-dashboard-period";

export function useSalesBreakdown() {
  const period = useDashboardPeriod();
  return useQuery({
    ...QUERY_CACHE_POLICY.panel,
    queryKey: [...DASHBOARD_BREAKDOWN_QUERY_KEY, period],
    queryFn: () => getSalesBreakdown(period),
    placeholderData: keepPreviousData,
  });
}
