import type { PagedFilters } from "@/@types/Modules/Core/Api/paged-filters";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { type PlansPage, plansPageSchema } from "@/schemas/Modules/Plataforma/Planos/plans-page-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function listPlans(filters: PagedFilters): Promise<PlansPage> {
  return requestApi(API_ENDPOINTS.plans.list, plansPageSchema, { query: filters });
}
