import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { type User, userSchema } from "@/schemas/Modules/Administracao/Usuarios/user-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function getUser(id: string): Promise<User> {
  return requestApi(API_ENDPOINTS.users.get, userSchema, { params: { id } });
}
