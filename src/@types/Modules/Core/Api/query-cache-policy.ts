import type { QueryObserverOptions } from "@tanstack/react-query";

export type QueryCachePolicy = Pick<
  QueryObserverOptions,
  "staleTime" | "gcTime" | "refetchOnWindowFocus" | "refetchInterval"
>;
