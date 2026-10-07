import type { IntegrationArea } from "@/@types/Modules/Administracao/Integracoes/integration-area";
import { INTEGRATION_AREA_ENDPOINTS } from "@/constants/Modules/Administracao/Integracoes/integrations";
import {
  type CompanyIntegration,
  companyIntegrationSchema,
} from "@/schemas/Modules/Administracao/Integracoes/company-integration-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function getIntegration(area: IntegrationArea, id: string): Promise<CompanyIntegration> {
  return requestApi(INTEGRATION_AREA_ENDPOINTS[area].get, companyIntegrationSchema, { params: { id } });
}
