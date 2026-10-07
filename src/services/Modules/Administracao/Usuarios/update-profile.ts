import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import {
  type ProfileDetail,
  profileDetailSchema,
} from "@/schemas/Modules/Administracao/Usuarios/profile-detail-schema";
import type { ProfileFormValues } from "@/schemas/Modules/Administracao/Usuarios/profile-form-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function updateProfile({
  id,
  version,
  ...values
}: ProfileFormValues & { id: string; version: number }): Promise<ProfileDetail> {
  return requestApi(API_ENDPOINTS.profiles.update, profileDetailSchema, {
    params: { id },
    body: { ...values, description: values.description || null, version },
  });
}
