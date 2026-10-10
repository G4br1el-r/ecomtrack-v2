"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { isSessionQuery } from "@/lib/Modules/Core/Shell/is-session-query";
import type { ViewAs } from "@/schemas/Modules/Core/Access/view-as-schema";
import { useViewAsStore } from "@/store/Modules/Core/Access/view-as-store";

export function useViewAs() {
  const queryClient = useQueryClient();
  const start = useViewAsStore((state) => state.start);
  const stop = useViewAsStore((state) => state.stop);
  const resetData = () => queryClient.resetQueries({ predicate: (query) => !isSessionQuery(query.queryKey) });

  const enter = useMutation({
    mutationFn: ({ request }: { label: string; request: () => Promise<ViewAs> }) => request(),
    onSuccess: (viewAs, { label }) => {
      start({ token: viewAs.accessToken, expiresAt: viewAs.expiresAt, label });
      resetData();
    },
  });

  return {
    enter,
    exit: () => {
      stop();
      resetData();
    },
  };
}
