import type { IntegrationArea } from "@/@types/Modules/Administracao/Integracoes/integration-area";
import type { PagedFilters } from "@/@types/Modules/Core/Api/paged-filters";
import { INTEGRATION_AREA_ENDPOINTS } from "@/constants/Modules/Administracao/Integracoes/integrations";
import {
  type IntegrationsPage,
  integrationsPageSchema,
} from "@/schemas/Modules/Administracao/Integracoes/integrations-page-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function listIntegrations(area: IntegrationArea, filters: PagedFilters): Promise<IntegrationsPage> {
  return requestApi(INTEGRATION_AREA_ENDPOINTS[area].list, integrationsPageSchema, { query: filters });
}
