import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { type PlanDetail, planDetailSchema } from "@/schemas/Modules/Plataforma/Planos/plan-detail-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function getPlan(id: string): Promise<PlanDetail> {
  return requestApi(API_ENDPOINTS.plans.get, planDetailSchema, { params: { id } });
}
