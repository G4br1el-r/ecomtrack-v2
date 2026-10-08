"use client";

import { useQuery } from "@tanstack/react-query";

import { USER_DETAIL_QUERY_KEY } from "@/constants/Modules/Administracao/Usuarios/users";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { getUser } from "@/services/Modules/Administracao/Usuarios/get-user";

export function useUser(id: string | null) {
  return useQuery({
    ...QUERY_CACHE_POLICY.edit,
    queryKey: [...USER_DETAIL_QUERY_KEY, id],
    queryFn: () => getUser(id ?? ""),
    enabled: id !== null,
  });
}
