import { z } from "zod";

import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export async function changePassword(request: { currentPassword: string; newPassword: string }): Promise<void> {
  await requestApi(API_ENDPOINTS.account.changePassword, z.null(), { body: request });
}
