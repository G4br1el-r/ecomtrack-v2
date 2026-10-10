"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { PREFERENCE_QUERY_KEY } from "@/constants/Modules/Core/Preferencias/preferences";
import { getPreference } from "@/services/Modules/Core/Preferencias/get-preference";

export function usePreference(key: string, enabled = true) {
  return useQuery({
    ...QUERY_CACHE_POLICY.edit,
    queryKey: [...PREFERENCE_QUERY_KEY, key],
    queryFn: () => getPreference(key),
    enabled,
  });
}
