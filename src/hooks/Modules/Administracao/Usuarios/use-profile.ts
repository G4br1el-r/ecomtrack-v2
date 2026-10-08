"use client";

import { useQuery } from "@tanstack/react-query";

import { PROFILE_DETAIL_QUERY_KEY } from "@/constants/Modules/Administracao/Usuarios/users";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { getProfile } from "@/services/Modules/Administracao/Usuarios/get-profile";

export function useProfile(id: string | null) {
  return useQuery({
    ...QUERY_CACHE_POLICY.edit,
    queryKey: [...PROFILE_DETAIL_QUERY_KEY, id],
    queryFn: () => getProfile(id ?? ""),
    enabled: id !== null,
  });
}
