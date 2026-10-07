import type { PermissionSelection } from "@/@types/Modules/Core/Access/permission-selection";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import {
  type ProfileDetail,
  profileDetailSchema,
} from "@/schemas/Modules/Administracao/Usuarios/profile-detail-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function updateProfilePermissions({
  id,
  version,
  ...selection
}: PermissionSelection & { id: string; version: number }): Promise<ProfileDetail> {
  return requestApi(API_ENDPOINTS.profiles.updatePermissions, profileDetailSchema, {
    params: { id },
    body: { ...selection, version },
  });
}
