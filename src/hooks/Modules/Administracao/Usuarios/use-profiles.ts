"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { PagedFilters } from "@/@types/Modules/Core/Api/paged-filters";
import { PROFILES_LIST_QUERY_KEY } from "@/constants/Modules/Administracao/Usuarios/users";
import { listProfiles } from "@/services/Modules/Administracao/Usuarios/list-profiles";

export function useProfiles(filters: PagedFilters) {
  return useQuery({
    queryKey: [...PROFILES_LIST_QUERY_KEY, filters],
    queryFn: () => listProfiles(filters),
    placeholderData: keepPreviousData,
  });
}
