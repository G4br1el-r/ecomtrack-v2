"use client";

import { useQuery } from "@tanstack/react-query";

import { PERMISSION_MENU_QUERY_KEY } from "@/constants/Modules/Core/Access/access";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { getPermissionMenu } from "@/services/Modules/Core/Access/get-permission-menu";

export function usePermissionMenu() {
  return useQuery({ ...QUERY_CACHE_POLICY.reference, queryKey: PERMISSION_MENU_QUERY_KEY, queryFn: getPermissionMenu });
}
