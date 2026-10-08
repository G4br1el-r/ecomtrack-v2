"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { ME_QUERY_KEY } from "@/constants/Modules/Core/Conta/account";
import { getMe } from "@/services/Modules/Core/Conta/get-me";

export function useMe() {
  return useQuery({ ...QUERY_CACHE_POLICY.edit, queryKey: ME_QUERY_KEY, queryFn: getMe });
}
