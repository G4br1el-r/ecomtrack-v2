import type { PermissionSelection } from "@/@types/Modules/Core/Access/permission-selection";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { type PlanDetail, planDetailSchema } from "@/schemas/Modules/Plataforma/Planos/plan-detail-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function updatePlanPermissions({ id, ...selection }: PermissionSelection & { id: string }): Promise<PlanDetail> {
  return requestApi(API_ENDPOINTS.plans.updatePermissions, planDetailSchema, { params: { id }, body: selection });
}
