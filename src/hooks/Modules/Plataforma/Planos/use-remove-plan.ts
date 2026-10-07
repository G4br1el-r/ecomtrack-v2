"use client";

import { PLANS_LIST_QUERY_KEY } from "@/constants/Modules/Plataforma/Planos/plans";
import { useOptimisticListMutation } from "@/hooks/Modules/Core/Api/use-optimistic-list-mutation";
import type { Plan } from "@/schemas/Modules/Plataforma/Planos/plan-schema";
import { removePlan } from "@/services/Modules/Plataforma/Planos/remove-plan";

export function useRemovePlan(handlers: { onSuccess?: () => void; onError?: (error: Error) => void } = {}) {
  return useOptimisticListMutation<string, void, Plan>({
    listKey: PLANS_LIST_QUERY_KEY,
    mutationFn: removePlan,
    update: (plans, id) => plans.filter((plan) => plan.id !== id),
    onSuccess: () => handlers.onSuccess?.(),
    onError: (error) => handlers.onError?.(error),
  });
}
