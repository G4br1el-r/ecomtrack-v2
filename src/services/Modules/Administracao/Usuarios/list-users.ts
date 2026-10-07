import type { UsersFilters } from "@/@types/Modules/Administracao/Usuarios/users-filters";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { type UsersPage, usersPageSchema } from "@/schemas/Modules/Administracao/Usuarios/users-page-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function listUsers(filters: UsersFilters): Promise<UsersPage> {
  return requestApi(API_ENDPOINTS.users.list, usersPageSchema, { query: filters });
}
