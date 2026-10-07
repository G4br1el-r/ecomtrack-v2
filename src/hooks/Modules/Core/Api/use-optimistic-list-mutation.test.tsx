import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useOptimisticListMutation } from "./use-optimistic-list-mutation";

type Item = { id: string; name: string };

const LIST_KEY = ["teste", "lista"];
const PAGE = {
  items: [
    { id: "1", name: "Ana" },
    { id: "2", name: "Bia" },
  ],
  totalCount: 2,
};

function setup(mutationFn: () => Promise<unknown>) {
  const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  queryClient.setQueryData([...LIST_KEY, { Page: 1 }], PAGE);
  const onError = vi.fn();
  const { result } = renderHook(
    () =>
      useOptimisticListMutation<string, unknown, Item>({
        listKey: LIST_KEY,
        mutationFn,
        update: (items, id) => items.filter((item) => item.id !== id),
        onError,
      }),
    { wrapper: ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider> },
  );
  return { queryClient, result, onError };
}

describe("useOptimisticListMutation", () => {
  it("atualiza a lista na hora, antes da resposta da API", async () => {
    let resolve: (value: unknown) => void = () => {};
    const { queryClient, result } = setup(() => new Promise((done) => (resolve = done)));

    act(() => result.current.mutate("1"));

    await waitFor(() =>
      expect(queryClient.getQueryData([...LIST_KEY, { Page: 1 }])).toEqual({ items: [PAGE.items[1]], totalCount: 1 }),
    );
    act(() => resolve(null));
  });

  it("desfaz a mudança quando a API falha", async () => {
    const { queryClient, result, onError } = setup(() => Promise.reject(new Error("falhou")));

    act(() => result.current.mutate("1"));

    await waitFor(() => expect(onError).toHaveBeenCalled());
    expect(queryClient.getQueryData([...LIST_KEY, { Page: 1 }])).toEqual(PAGE);
  });
});
