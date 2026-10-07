"use client";

import { useQuery } from "@tanstack/react-query";

import type { IntegrationArea } from "@/@types/Modules/Administracao/Integracoes/integration-area";
import { INTEGRATION_PROVIDERS_QUERY_KEY } from "@/constants/Modules/Administracao/Integracoes/integrations";
import { listIntegrationProviders } from "@/services/Modules/Administracao/Integracoes/list-integration-providers";

export function useIntegrationProviders(area: IntegrationArea) {
  return useQuery({
    queryKey: [...INTEGRATION_PROVIDERS_QUERY_KEY, area],
    queryFn: () => listIntegrationProviders(area),
  });
}
