import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { type UserPreference, userPreferenceSchema } from "@/schemas/Modules/Core/Preferencias/user-preference-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function savePreference({ key, value }: { key: string; value: unknown }): Promise<UserPreference> {
  return requestApi(API_ENDPOINTS.preferences.save, userPreferenceSchema, { params: { key }, body: { value } });
}
