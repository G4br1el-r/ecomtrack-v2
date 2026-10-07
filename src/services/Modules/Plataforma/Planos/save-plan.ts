import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { type PlanDetail, planDetailSchema } from "@/schemas/Modules/Plataforma/Planos/plan-detail-schema";
import type { PlanFormValues } from "@/schemas/Modules/Plataforma/Planos/plan-form-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function savePlan({ id, description, ...values }: PlanFormValues & { id?: string }): Promise<PlanDetail> {
  return id
    ? requestApi(API_ENDPOINTS.plans.update, planDetailSchema, {
        params: { id },
        body: { ...values, description: description || null },
      })
    : requestApi(API_ENDPOINTS.plans.create, planDetailSchema, {
        body: { ...values, description: description || null },
      });
}
