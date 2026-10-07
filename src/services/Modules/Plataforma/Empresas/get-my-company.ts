import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { type Company, companySchema } from "@/schemas/Modules/Plataforma/Empresas/company-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function getMyCompany(): Promise<Company> {
  return requestApi(API_ENDPOINTS.companies.mine, companySchema);
}
