import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import {
  type ProfileDetail,
  profileDetailSchema,
} from "@/schemas/Modules/Administracao/Usuarios/profile-detail-schema";
import type { ProfileFormValues } from "@/schemas/Modules/Administracao/Usuarios/profile-form-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function createProfile(values: ProfileFormValues): Promise<ProfileDetail> {
  return requestApi(API_ENDPOINTS.profiles.create, profileDetailSchema, {
    body: { ...values, description: values.description || null },
  });
}
