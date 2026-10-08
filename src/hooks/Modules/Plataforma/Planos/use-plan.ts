"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { PLAN_DETAIL_QUERY_KEY } from "@/constants/Modules/Plataforma/Planos/plans";
import { getPlan } from "@/services/Modules/Plataforma/Planos/get-plan";

export function usePlan(id: string | null) {
  return useQuery({
    ...QUERY_CACHE_POLICY.edit,
    queryKey: [...PLAN_DETAIL_QUERY_KEY, id],
    queryFn: () => getPlan(id ?? ""),
    enabled: id !== null,
  });
}
