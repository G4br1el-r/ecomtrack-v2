import { z } from "zod";

import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import {
  type PermissionMenuSection,
  permissionMenuSectionSchema,
} from "@/schemas/Modules/Core/Access/permission-menu-section-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function getPermissionMenu(): Promise<PermissionMenuSection[]> {
  return requestApi(API_ENDPOINTS.permissions.menu, z.array(permissionMenuSectionSchema));
}
