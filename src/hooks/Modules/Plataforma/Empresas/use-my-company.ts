"use client";

import { useQuery } from "@tanstack/react-query";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { MY_COMPANY_QUERY_KEY } from "@/constants/Modules/Plataforma/Empresas/companies";
import { getMyCompany } from "@/services/Modules/Plataforma/Empresas/get-my-company";

export function useMyCompany(enabled: boolean) {
  return useQuery({ ...QUERY_CACHE_POLICY.reference, queryKey: MY_COMPANY_QUERY_KEY, queryFn: getMyCompany, enabled });
}
