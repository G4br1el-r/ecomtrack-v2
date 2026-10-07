"use client";

import { useQuery } from "@tanstack/react-query";

import { SESSION_QUERY_KEY, SESSION_REFRESH_INTERVAL_MS } from "@/constants/Modules/Core/Auth/auth";
import { refreshAccessToken } from "@/services/Modules/Core/Auth/refresh-access-token";

export function useSession() {
  return useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: refreshAccessToken,
    staleTime: Number.POSITIVE_INFINITY,
    refetchInterval: SESSION_REFRESH_INTERVAL_MS,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
}
