import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import type { UserFormValues } from "@/schemas/Modules/Administracao/Usuarios/user-form-schema";
import { type User, userSchema } from "@/schemas/Modules/Administracao/Usuarios/user-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function updateUser({ id, ...values }: UserFormValues & { id: string }): Promise<User> {
  return requestApi(API_ENDPOINTS.users.update, userSchema, { params: { id }, body: values });
}
