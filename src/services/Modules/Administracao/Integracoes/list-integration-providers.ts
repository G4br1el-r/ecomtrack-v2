import { z } from "zod";

import type { IntegrationArea } from "@/@types/Modules/Administracao/Integracoes/integration-area";
import { INTEGRATION_AREA_ENDPOINTS } from "@/constants/Modules/Administracao/Integracoes/integrations";
import {
  type IntegrationProvider,
  integrationProviderSchema,
} from "@/schemas/Modules/Administracao/Integracoes/integration-provider-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function listIntegrationProviders(area: IntegrationArea): Promise<IntegrationProvider[]> {
  return requestApi(INTEGRATION_AREA_ENDPOINTS[area].providers, z.array(integrationProviderSchema));
}
