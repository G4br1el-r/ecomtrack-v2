"use client";

import { useQuery } from "@tanstack/react-query";

import type { UserActivityFilters } from "@/@types/Modules/Administracao/Usuarios/users-filters";
import { USER_ACTIVITY_QUERY_KEY } from "@/constants/Modules/Administracao/Usuarios/users";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { listUserActivity } from "@/services/Modules/Administracao/Usuarios/list-user-activity";

export function useUserActivity(userId: string | null, filters: UserActivityFilters) {
  return useQuery({
    ...QUERY_CACHE_POLICY.operational,
    queryKey: [...USER_ACTIVITY_QUERY_KEY, userId, filters],
    queryFn: () => listUserActivity(userId ?? "", filters),
    enabled: userId !== null,
  });
}
