"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PERMISSIONS_QUERY_KEY } from "@/constants/Modules/Core/Access/access";
import { PLAN_DETAIL_QUERY_KEY, PLANS_LIST_QUERY_KEY } from "@/constants/Modules/Plataforma/Planos/plans";
import { updatePlanPermissions } from "@/services/Modules/Plataforma/Planos/update-plan-permissions";

export function useUpdatePlanPermissions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePlanPermissions,
    onSuccess: (plan) => queryClient.setQueryData([...PLAN_DETAIL_QUERY_KEY, plan.id], plan),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PLANS_LIST_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: PERMISSIONS_QUERY_KEY });
    },
  });
}
