"use client";

import type { IntegrationArea } from "@/@types/Modules/Administracao/Integracoes/integration-area";
import type { IntegrationRequest } from "@/@types/Modules/Administracao/Integracoes/integration-request";
import { INTEGRATIONS_QUERY_KEY } from "@/constants/Modules/Administracao/Integracoes/integrations";
import { useOptimisticListMutation } from "@/hooks/Modules/Core/Api/use-optimistic-list-mutation";
import type { CompanyIntegration } from "@/schemas/Modules/Administracao/Integracoes/company-integration-schema";
import { saveIntegration } from "@/services/Modules/Administracao/Integracoes/save-integration";

type SaveIntegrationVariables = IntegrationRequest & { id?: string };

export function useSaveIntegration(
  area: IntegrationArea,
  handlers: {
    onSuccess?: (integration: CompanyIntegration, variables: SaveIntegrationVariables) => void;
    onError?: (error: Error) => void;
  } = {},
) {
  return useOptimisticListMutation<SaveIntegrationVariables, CompanyIntegration, CompanyIntegration>({
    listKey: [...INTEGRATIONS_QUERY_KEY, area, "lista"],
    invalidateKeys: [[...INTEGRATIONS_QUERY_KEY, area, "detalhe"]],
    mutationFn: (variables) => saveIntegration(area, variables),
    update: (integrations, { id, name, isActive }) =>
      integrations.map((integration) =>
        integration.id === id ? { ...integration, name: name ?? integration.name, isActive } : integration,
      ),
    onSuccess: handlers.onSuccess,
    onError: handlers.onError,
  });
}
