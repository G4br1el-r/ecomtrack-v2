"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { IntegrationArea } from "@/@types/Modules/Administracao/Integracoes/integration-area";
import type { PagedFilters } from "@/@types/Modules/Core/Api/paged-filters";
import { INTEGRATIONS_QUERY_KEY } from "@/constants/Modules/Administracao/Integracoes/integrations";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { listIntegrations } from "@/services/Modules/Administracao/Integracoes/list-integrations";

export function useIntegrations(area: IntegrationArea, filters: PagedFilters) {
  return useQuery({
    ...QUERY_CACHE_POLICY.operational,
    queryKey: [...INTEGRATIONS_QUERY_KEY, area, "lista", filters],
    queryFn: () => listIntegrations(area, filters),
    placeholderData: keepPreviousData,
  });
}
