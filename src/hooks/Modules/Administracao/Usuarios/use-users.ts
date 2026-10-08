"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { UsersFilters } from "@/@types/Modules/Administracao/Usuarios/users-filters";
import { USERS_LIST_QUERY_KEY } from "@/constants/Modules/Administracao/Usuarios/users";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { listUsers } from "@/services/Modules/Administracao/Usuarios/list-users";

export function useUsers(filters: UsersFilters) {
  return useQuery({
    ...QUERY_CACHE_POLICY.operational,
    queryKey: [...USERS_LIST_QUERY_KEY, filters],
    queryFn: () => listUsers(filters),
    placeholderData: keepPreviousData,
  });
}
