import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import type { CompanyFormValues } from "@/schemas/Modules/Plataforma/Empresas/company-form-schema";
import { type Company, companySchema } from "@/schemas/Modules/Plataforma/Empresas/company-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function saveCompany({ id, document, ...values }: CompanyFormValues & { id?: string }): Promise<Company> {
  return id
    ? requestApi(API_ENDPOINTS.companies.update, companySchema, {
        params: { id },
        body: { ...values, document: document || null },
      })
    : requestApi(API_ENDPOINTS.companies.create, companySchema, { body: { ...values, document: document || null } });
}
