"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { RemovedItem } from "@/@types/Modules/Core/DesignSystem/removed-item";
import { restoreAt } from "@/lib/Modules/Core/DesignSystem/restore-at";

import { ORDERS_QUERY_KEY, type Order } from "../mocks/orders";
import { restoreOrder } from "../services/restore-order";

export function useRestoreOrderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: restoreOrder,
    onMutate: async (removed: RemovedItem<Order>) => {
      await queryClient.cancelQueries({ queryKey: ORDERS_QUERY_KEY });
      const previous = queryClient.getQueryData<Order[]>(ORDERS_QUERY_KEY) ?? [];
      queryClient.setQueryData<Order[]>(ORDERS_QUERY_KEY, restoreAt(previous, removed));
      return { previous };
    },
    onError: (_error, _removed, context) => {
      if (context) queryClient.setQueryData<Order[]>(ORDERS_QUERY_KEY, context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY }),
  });
}
