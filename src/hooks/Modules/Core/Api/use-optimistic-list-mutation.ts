"use client";

import { type QueryKey, useMutation, useQueryClient } from "@tanstack/react-query";

import type { PagedItems } from "@/@types/Modules/Core/Api/paged-items";

export function useOptimisticListMutation<TVariables, TData, TItem>({
  listKey,
  mutationFn,
  update,
  onSuccess,
  onError,
  invalidateKeys = [],
}: {
  listKey: QueryKey;
  mutationFn: (variables: TVariables) => Promise<TData>;
  update: (items: TItem[], variables: TVariables) => TItem[];
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
  invalidateKeys?: QueryKey[];
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: listKey });
      const snapshot = queryClient.getQueriesData<PagedItems<TItem>>({ queryKey: listKey });
      queryClient.setQueriesData<PagedItems<TItem>>({ queryKey: listKey }, (page) => {
        if (!Array.isArray(page?.items)) return page;
        const items = update(page.items, variables);
        return { ...page, items, totalCount: page.totalCount + items.length - page.items.length };
      });
      return { snapshot };
    },
    onError: (error, variables, context) => {
      for (const [key, data] of context?.snapshot ?? []) queryClient.setQueryData(key, data);
      onError?.(error, variables);
    },
    onSuccess,
    onSettled: () => {
      for (const key of [listKey, ...invalidateKeys]) queryClient.invalidateQueries({ queryKey: key });
    },
  });
}
