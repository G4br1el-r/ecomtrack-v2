"use client";

import type { IntegrationArea } from "@/@types/Modules/Administracao/Integracoes/integration-area";
import { INTEGRATIONS_QUERY_KEY } from "@/constants/Modules/Administracao/Integracoes/integrations";
import { useOptimisticListMutation } from "@/hooks/Modules/Core/Api/use-optimistic-list-mutation";
import type { CompanyIntegration } from "@/schemas/Modules/Administracao/Integracoes/company-integration-schema";
import { removeIntegration } from "@/services/Modules/Administracao/Integracoes/remove-integration";

export function useRemoveIntegration(
  area: IntegrationArea,
  handlers: { onSuccess?: () => void; onError?: (error: Error) => void } = {},
) {
  return useOptimisticListMutation<string, void, CompanyIntegration>({
    listKey: [...INTEGRATIONS_QUERY_KEY, area, "lista"],
    mutationFn: (id) => removeIntegration(area, id),
    update: (integrations, id) => integrations.filter((integration) => integration.id !== id),
    onSuccess: () => handlers.onSuccess?.(),
    onError: (error) => handlers.onError?.(error),
  });
}
