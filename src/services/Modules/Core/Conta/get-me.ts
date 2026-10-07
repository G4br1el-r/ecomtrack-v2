import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { type CurrentUser, currentUserSchema } from "@/schemas/Modules/Core/Auth/current-user-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function getMe(): Promise<CurrentUser> {
  return requestApi(API_ENDPOINTS.account.get, currentUserSchema);
}
