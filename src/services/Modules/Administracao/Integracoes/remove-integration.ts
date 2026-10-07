import { z } from "zod";

import type { IntegrationArea } from "@/@types/Modules/Administracao/Integracoes/integration-area";
import { INTEGRATION_AREA_ENDPOINTS } from "@/constants/Modules/Administracao/Integracoes/integrations";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export async function removeIntegration(area: IntegrationArea, id: string): Promise<void> {
  await requestApi(INTEGRATION_AREA_ENDPOINTS[area].remove, z.null(), { params: { id } });
}
