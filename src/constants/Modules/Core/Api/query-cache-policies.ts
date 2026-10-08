import type { QueryCachePolicy } from "@/@types/Modules/Core/Api/query-cache-policy";

const ONE_SECOND_IN_MS = 1000;
const ONE_MINUTE_IN_MS = 60 * ONE_SECOND_IN_MS;
const THIRTY_SECONDS_IN_MS = 30 * ONE_SECOND_IN_MS;
const FIVE_MINUTES_IN_MS = 5 * ONE_MINUTE_IN_MS;
const THIRTY_MINUTES_IN_MS = 30 * ONE_MINUTE_IN_MS;

export const QUERY_CACHE_POLICY = {
  static: { staleTime: THIRTY_MINUTES_IN_MS, refetchOnWindowFocus: false },
  reference: { staleTime: FIVE_MINUTES_IN_MS, refetchOnWindowFocus: true },
  operational: { staleTime: THIRTY_SECONDS_IN_MS, refetchOnWindowFocus: true },
  edit: { staleTime: 0, gcTime: 0, refetchOnWindowFocus: false },
  immutable: { staleTime: Number.POSITIVE_INFINITY, refetchOnWindowFocus: false },
  panel: { staleTime: ONE_MINUTE_IN_MS, refetchOnWindowFocus: true, refetchInterval: FIVE_MINUTES_IN_MS },
} as const satisfies Record<string, QueryCachePolicy>;
