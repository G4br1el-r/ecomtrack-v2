"use client";

import { useQuery } from "@tanstack/react-query";

import { NOTIFICATION_QUERY_KEY } from "@/constants/Modules/Administracao/Comunicacao/communication";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { getNotification } from "@/services/Modules/Administracao/Comunicacao/get-notification";

export function useNotification(key: string | null) {
  return useQuery({
    ...QUERY_CACHE_POLICY.edit,
    queryKey: [...NOTIFICATION_QUERY_KEY, key],
    queryFn: () => getNotification(key ?? ""),
    enabled: key !== null,
  });
}
