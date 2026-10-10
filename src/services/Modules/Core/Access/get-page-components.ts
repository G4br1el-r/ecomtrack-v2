import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import {
  type PagePermissionComponents,
  pagePermissionComponentsSchema,
} from "@/schemas/Modules/Core/Access/page-permission-components-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function getPageComponents(code: string): Promise<PagePermissionComponents> {
  return requestApi(API_ENDPOINTS.permissions.components, pagePermissionComponentsSchema, { params: { code } });
}
