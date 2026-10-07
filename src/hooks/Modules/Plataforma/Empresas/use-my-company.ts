"use client";

import { useQuery } from "@tanstack/react-query";

import { MY_COMPANY_QUERY_KEY } from "@/constants/Modules/Plataforma/Empresas/companies";
import { getMyCompany } from "@/services/Modules/Plataforma/Empresas/get-my-company";

export function useMyCompany(enabled: boolean) {
  return useQuery({ queryKey: MY_COMPANY_QUERY_KEY, queryFn: getMyCompany, enabled });
}
