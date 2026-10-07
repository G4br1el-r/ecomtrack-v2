"use client";

import { useQuery } from "@tanstack/react-query";

import { DASHBOARD_GOAL_QUERY_KEY } from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";
import { getMonthlyGoal } from "@/services/Modules/VisaoGeral/Dashboard/get-monthly-goal";

export function useMonthlyGoal() {
  return useQuery({ queryKey: DASHBOARD_GOAL_QUERY_KEY, queryFn: getMonthlyGoal });
}
