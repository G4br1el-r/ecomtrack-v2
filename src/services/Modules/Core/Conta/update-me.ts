import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { type CurrentUser, currentUserSchema } from "@/schemas/Modules/Core/Auth/current-user-schema";
import type { UpdateMeFormValues } from "@/schemas/Modules/Core/Conta/update-me-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export function updateMe(values: UpdateMeFormValues): Promise<CurrentUser> {
  return requestApi(API_ENDPOINTS.account.update, currentUserSchema, {
    body: { ...values, avatarUrl: values.avatarUrl || null },
  });
}
