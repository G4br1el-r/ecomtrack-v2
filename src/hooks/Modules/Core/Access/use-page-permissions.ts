"use client";

import { useQuery } from "@tanstack/react-query";

import { PAGE_PERMISSIONS_QUERY_KEY } from "@/constants/Modules/Core/Access/access";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { getPageComponents } from "@/services/Modules/Core/Access/get-page-components";

export function usePagePermissions(pageCode: string | undefined) {
  return useQuery({
    ...QUERY_CACHE_POLICY.reference,
    queryKey: [...PAGE_PERMISSIONS_QUERY_KEY, pageCode],
    queryFn: () => getPageComponents(pageCode ?? ""),
    enabled: Boolean(pageCode),
  });
}
