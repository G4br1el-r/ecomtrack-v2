import { z } from "zod";

import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import type { ForgotPasswordFormValues } from "@/schemas/Modules/Core/Auth/forgot-password-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export async function forgotPassword(values: ForgotPasswordFormValues): Promise<void> {
  await requestApi(API_ENDPOINTS.auth.forgotPassword, z.unknown(), { body: values });
}
