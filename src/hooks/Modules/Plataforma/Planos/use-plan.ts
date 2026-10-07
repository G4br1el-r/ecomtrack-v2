"use client";

import { useQuery } from "@tanstack/react-query";

import { PLAN_DETAIL_QUERY_KEY } from "@/constants/Modules/Plataforma/Planos/plans";
import { getPlan } from "@/services/Modules/Plataforma/Planos/get-plan";

export function usePlan(id: string | null) {
  return useQuery({ queryKey: [...PLAN_DETAIL_QUERY_KEY, id], queryFn: () => getPlan(id ?? ""), enabled: id !== null });
}
