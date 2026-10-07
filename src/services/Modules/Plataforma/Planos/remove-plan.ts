import { z } from "zod";

import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export async function removePlan(id: string): Promise<void> {
  await requestApi(API_ENDPOINTS.plans.remove, z.null(), { params: { id } });
}
