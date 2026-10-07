import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import {
  type ProfilePermissions,
  profilePermissionsSchema,
} from "@/schemas/Modules/Core/Access/profile-permissions-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function getMyPermissions(): Promise<ProfilePermissions> {
  return requestApi(API_ENDPOINTS.permissions.mine, profilePermissionsSchema);
}
