"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { UsersFilters } from "@/@types/Modules/Administracao/Usuarios/users-filters";
import { USERS_LIST_QUERY_KEY } from "@/constants/Modules/Administracao/Usuarios/users";
import { listUsers } from "@/services/Modules/Administracao/Usuarios/list-users";

export function useUsers(filters: UsersFilters) {
  return useQuery({
    queryKey: [...USERS_LIST_QUERY_KEY, filters],
    queryFn: () => listUsers(filters),
    placeholderData: keepPreviousData,
  });
}
