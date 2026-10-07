"use client";

import { useQuery } from "@tanstack/react-query";

import { NOTIFICATION_QUERY_KEY } from "@/constants/Modules/Administracao/Comunicacao/communication";
import { getNotification } from "@/services/Modules/Administracao/Comunicacao/get-notification";

export function useNotification(key: string | null) {
  return useQuery({
    queryKey: [...NOTIFICATION_QUERY_KEY, key],
    queryFn: () => getNotification(key ?? ""),
    enabled: key !== null,
  });
}
