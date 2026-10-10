"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { PREFERENCES_QUERY_KEY } from "@/constants/Modules/Core/Preferencias/preferences";
import { listPreferences } from "@/services/Modules/Core/Preferencias/list-preferences";

export function usePreferences() {
  return useQuery({ ...QUERY_CACHE_POLICY.reference, queryKey: PREFERENCES_QUERY_KEY, queryFn: listPreferences });
}
