import { z } from "zod";

import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import type { PinType } from "@/schemas/Modules/Core/Conta/pin-type-schema";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export async function setPin(request: { type: PinType; pin: string; currentPassword: string }): Promise<void> {
  await requestApi(API_ENDPOINTS.account.setPin, z.null(), { body: request });
}
