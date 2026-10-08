"use client";

import { useQuery } from "@tanstack/react-query";

import type { IntegrationArea } from "@/@types/Modules/Administracao/Integracoes/integration-area";
import { INTEGRATIONS_QUERY_KEY } from "@/constants/Modules/Administracao/Integracoes/integrations";
import { QUERY_CACHE_POLICY } from "@/constants/Modules/Core/Api/query-cache-policies";
import { getIntegration } from "@/services/Modules/Administracao/Integracoes/get-integration";

export function useIntegration(area: IntegrationArea, id: string | null) {
  return useQuery({
    ...QUERY_CACHE_POLICY.edit,
    queryKey: [...INTEGRATIONS_QUERY_KEY, area, "detalhe", id],
    queryFn: () => getIntegration(area, id ?? ""),
    enabled: id !== null,
  });
}
