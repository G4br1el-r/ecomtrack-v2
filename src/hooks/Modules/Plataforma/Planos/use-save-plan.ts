"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PLAN_DETAIL_QUERY_KEY, PLANS_LIST_QUERY_KEY } from "@/constants/Modules/Plataforma/Planos/plans";
import { savePlan } from "@/services/Modules/Plataforma/Planos/save-plan";

export function useSavePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: savePlan,
    onSuccess: (plan) => queryClient.setQueryData([...PLAN_DETAIL_QUERY_KEY, plan.id], plan),
    onSettled: () => queryClient.invalidateQueries({ queryKey: PLANS_LIST_QUERY_KEY }),
  });
}
