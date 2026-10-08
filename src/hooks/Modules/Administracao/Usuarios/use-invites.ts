"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { InvitesFilters } from "@/@types/Modules/Administracao/Usuarios/users-filters";
import { INVITES_LIST_QUERY_KEY } from "@/constants/Modules/Administracao/Usuarios/users";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { listInvites } from "@/services/Modules/Administracao/Usuarios/list-invites";

export function useInvites(filters: InvitesFilters, enabled = true) {
  return useQuery({
    ...QUERY_CACHE_POLICY.operational,
    queryKey: [...INVITES_LIST_QUERY_KEY, filters],
    queryFn: () => listInvites(filters),
    placeholderData: keepPreviousData,
    enabled,
  });
}
