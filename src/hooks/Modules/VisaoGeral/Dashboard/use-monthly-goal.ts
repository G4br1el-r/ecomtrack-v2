"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { DASHBOARD_GOAL_QUERY_KEY } from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";
import { getMonthlyGoal } from "@/services/Modules/VisaoGeral/Dashboard/get-monthly-goal";

export function useMonthlyGoal() {
  return useQuery({ ...QUERY_CACHE_POLICY.panel, queryKey: DASHBOARD_GOAL_QUERY_KEY, queryFn: getMonthlyGoal });
}
