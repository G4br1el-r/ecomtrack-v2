import type { SupplierProductsFilters } from "@/@types/Modules/Administracao/Fornecedores/supplier-products-filters";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import {
  type SupplierProductsPage,
  supplierProductsPageSchema,
} from "@/schemas/Modules/Administracao/Fornecedores/supplier-products-page-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function listSupplierProducts(filters: SupplierProductsFilters): Promise<SupplierProductsPage> {
  return requestApi(API_ENDPOINTS.supplierProducts.list, supplierProductsPageSchema, { query: filters });
}
