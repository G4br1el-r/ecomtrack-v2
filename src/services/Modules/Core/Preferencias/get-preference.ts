import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { HTTP_STATUS } from "@/constants/Modules/Core/Api/http";
import { getApiErrorStatus } from "@/lib/Modules/Core/Api/get-api-error-status";
import { type UserPreference, userPreferenceSchema } from "@/schemas/Modules/Core/Preferencias/user-preference-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export async function getPreference(key: string): Promise<UserPreference | null> {
  try {
    return await requestApi(API_ENDPOINTS.preferences.get, userPreferenceSchema, { params: { key } });
  } catch (error) {
    if (getApiErrorStatus(error) === HTTP_STATUS.notFound) return null;
    throw error;
  }
}
