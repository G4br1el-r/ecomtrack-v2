import type { UserActivityFilters } from "@/@types/Modules/Administracao/Usuarios/users-filters";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import {
  type UserActivityPage,
  userActivityPageSchema,
} from "@/schemas/Modules/Administracao/Usuarios/user-activity-page-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function listUserActivity(id: string, filters: UserActivityFilters): Promise<UserActivityPage> {
  return requestApi(API_ENDPOINTS.users.activity, userActivityPageSchema, { params: { id }, query: filters });
}
