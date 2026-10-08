"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { CompaniesFilters } from "@/@types/Modules/Plataforma/Empresas/companies-filters";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { COMPANIES_QUERY_KEY } from "@/constants/Modules/Plataforma/Empresas/companies";
import { listCompanies } from "@/services/Modules/Plataforma/Empresas/list-companies";

export function useCompanies(filters: CompaniesFilters, enabled = true) {
  return useQuery({
    ...QUERY_CACHE_POLICY.reference,
    queryKey: [...COMPANIES_QUERY_KEY, filters],
    queryFn: () => listCompanies(filters),
    placeholderData: keepPreviousData,
    enabled,
  });
}
