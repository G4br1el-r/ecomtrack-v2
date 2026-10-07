"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeById } from "@/lib/Modules/Core/DesignSystem/remove-by-id";

import { ORDERS_QUERY_KEY, type Order } from "../mocks/orders";
import { deleteOrder } from "../services/delete-order";

export function useDeleteOrderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOrder,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ORDERS_QUERY_KEY });
      const previous = queryClient.getQueryData<Order[]>(ORDERS_QUERY_KEY) ?? [];
      const { list, removed } = removeById(previous, id);
      queryClient.setQueryData<Order[]>(ORDERS_QUERY_KEY, list);
      return { previous, removed };
    },
    onError: (_error, _id, context) => {
      if (context) queryClient.setQueryData<Order[]>(ORDERS_QUERY_KEY, context.previous);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY }),
  });
}
