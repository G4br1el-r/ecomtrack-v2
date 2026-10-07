import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import {
  type ProfileDetail,
  profileDetailSchema,
} from "@/schemas/Modules/Administracao/Usuarios/profile-detail-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function getProfile(id: string): Promise<ProfileDetail> {
  return requestApi(API_ENDPOINTS.profiles.get, profileDetailSchema, { params: { id } });
}
