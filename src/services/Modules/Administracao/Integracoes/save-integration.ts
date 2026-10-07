import type { IntegrationArea } from "@/@types/Modules/Administracao/Integracoes/integration-area";
import type { IntegrationRequest } from "@/@types/Modules/Administracao/Integracoes/integration-request";
import { INTEGRATION_AREA_ENDPOINTS } from "@/constants/Modules/Administracao/Integracoes/integrations";
import {
  type CompanyIntegration,
  companyIntegrationSchema,
} from "@/schemas/Modules/Administracao/Integracoes/company-integration-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function saveIntegration(
  area: IntegrationArea,
  { id, providerId, ...request }: IntegrationRequest & { id?: string },
): Promise<CompanyIntegration> {
  const endpoints = INTEGRATION_AREA_ENDPOINTS[area];
  return id
    ? requestApi(endpoints.update, companyIntegrationSchema, { params: { id }, body: request })
    : requestApi(endpoints.create, companyIntegrationSchema, { body: { providerId, ...request } });
}
