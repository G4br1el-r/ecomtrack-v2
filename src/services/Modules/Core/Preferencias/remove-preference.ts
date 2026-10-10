import { z } from "zod";

import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { requestApi } from "@/services/Modules/Core/Api/request-api";

export async function removePreference(key: string): Promise<void> {
  await requestApi(API_ENDPOINTS.preferences.remove, z.null(), { params: { key } });
}
