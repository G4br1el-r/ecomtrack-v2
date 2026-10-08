"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { DASHBOARD_TOP_PRODUCTS_QUERY_KEY } from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";
import { getTopProducts } from "@/services/Modules/VisaoGeral/Dashboard/get-top-products";
import { useDashboardPeriod } from "./use-dashboard-period";

export function useTopProducts() {
  const period = useDashboardPeriod();
  return useQuery({
    ...QUERY_CACHE_POLICY.panel,
    queryKey: [...DASHBOARD_TOP_PRODUCTS_QUERY_KEY, period],
    queryFn: () => getTopProducts(period),
    placeholderData: keepPreviousData,
  });
}
