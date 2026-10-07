import { z } from "zod";

import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export async function resetPassword(request: { token: string; password: string }): Promise<void> {
  await requestApi(API_ENDPOINTS.auth.resetPassword, z.null(), { body: request });
}
