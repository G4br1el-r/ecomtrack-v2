"use client";

import { useQuery } from "@tanstack/react-query";

import { COMPANY_DETAIL_QUERY_KEY } from "@/constants/Modules/Plataforma/Empresas/companies";
import { getCompany } from "@/services/Modules/Plataforma/Empresas/get-company";

export function useCompany(id: string | null) {
  return useQuery({
    queryKey: [...COMPANY_DETAIL_QUERY_KEY, id],
    queryFn: () => getCompany(id ?? ""),
    enabled: id !== null,
  });
}
