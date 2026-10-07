"use client";

import { useQuery } from "@tanstack/react-query";

import { PERMISSION_CATALOG_QUERY_KEY } from "@/constants/Modules/Core/Access/access";
import { getPermissionCatalog } from "@/services/Modules/Core/Access/get-permission-catalog";

export function usePermissionCatalog(enabled = true, scope: "company" | "platform" = "company") {
  return useQuery({
    queryKey: [...PERMISSION_CATALOG_QUERY_KEY, scope],
    queryFn: () => getPermissionCatalog(scope),
    enabled,
  });
}
