"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { DASHBOARD_TOP_PRODUCTS_QUERY_KEY } from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";
import { getTopProducts } from "@/services/Modules/VisaoGeral/Dashboard/get-top-products";

import { useDashboardPeriod } from "./use-dashboard-period";

export function useTopProducts() {
  const period = useDashboardPeriod();
  return useQuery({
    queryKey: [...DASHBOARD_TOP_PRODUCTS_QUERY_KEY, period],
    queryFn: () => getTopProducts(period),
    placeholderData: keepPreviousData,
  });
}
