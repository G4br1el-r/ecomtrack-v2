"use client";

import { useQuery } from "@tanstack/react-query";

import { MY_PERMISSIONS_QUERY_KEY } from "@/constants/Modules/Core/Access/access";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { getMyPermissions } from "@/services/Modules/Core/Access/get-my-permissions";

export function useMyPermissions() {
  return useQuery({ ...QUERY_CACHE_POLICY.reference, queryKey: MY_PERMISSIONS_QUERY_KEY, queryFn: getMyPermissions });
}
