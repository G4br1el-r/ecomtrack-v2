"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { PagedFilters } from "@/@types/Modules/Core/Api/paged-filters";
import { PLANS_LIST_QUERY_KEY } from "@/constants/Modules/Plataforma/Planos/plans";
import { listPlans } from "@/services/Modules/Plataforma/Planos/list-plans";

export function usePlans(filters: PagedFilters) {
  return useQuery({
    queryKey: [...PLANS_LIST_QUERY_KEY, filters],
    queryFn: () => listPlans(filters),
    placeholderData: keepPreviousData,
  });
}
