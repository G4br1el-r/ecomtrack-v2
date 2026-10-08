"use client";

import { useQuery } from "@tanstack/react-query";

import type { IntegrationArea } from "@/@types/Modules/Administracao/Integracoes/integration-area";
import { INTEGRATION_PROVIDERS_QUERY_KEY } from "@/constants/Modules/Administracao/Integracoes/integrations";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { listIntegrationProviders } from "@/services/Modules/Administracao/Integracoes/list-integration-providers";

export function useIntegrationProviders(area: IntegrationArea) {
  return useQuery({
    ...QUERY_CACHE_POLICY.static,
    queryKey: [...INTEGRATION_PROVIDERS_QUERY_KEY, area],
    queryFn: () => listIntegrationProviders(area),
  });
}
