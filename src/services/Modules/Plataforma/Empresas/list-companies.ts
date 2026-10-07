import type { CompaniesFilters } from "@/@types/Modules/Plataforma/Empresas/companies-filters";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { type CompaniesPage, companiesPageSchema } from "@/schemas/Modules/Plataforma/Empresas/companies-page-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function listCompanies(filters: CompaniesFilters): Promise<CompaniesPage> {
  return requestApi(API_ENDPOINTS.companies.list, companiesPageSchema, { query: filters });
}
