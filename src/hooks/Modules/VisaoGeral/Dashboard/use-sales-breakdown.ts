"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { DASHBOARD_BREAKDOWN_QUERY_KEY } from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";
import { getSalesBreakdown } from "@/services/Modules/VisaoGeral/Dashboard/get-sales-breakdown";

import { useDashboardPeriod } from "./use-dashboard-period";

export function useSalesBreakdown() {
  const period = useDashboardPeriod();
  return useQuery({
    queryKey: [...DASHBOARD_BREAKDOWN_QUERY_KEY, period],
    queryFn: () => getSalesBreakdown(period),
    placeholderData: keepPreviousData,
  });
}
