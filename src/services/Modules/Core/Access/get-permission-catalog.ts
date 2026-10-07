import { z } from "zod";

import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { type CatalogPage, catalogPageSchema } from "@/schemas/Modules/Core/Access/catalog-page-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function getPermissionCatalog(scope: "company" | "platform" = "company"): Promise<CatalogPage[]> {
  return requestApi(API_ENDPOINTS.profiles.catalog, z.array(catalogPageSchema), { skipCompany: scope === "platform" });
}
