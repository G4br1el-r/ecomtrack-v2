import type { ApiEndpoint } from "@/@types/Modules/Core/Api/api-endpoint";
import type { ApiEndpointEntry, ApiEndpointKey } from "@/@types/Modules/Core/Api/api-endpoint-key";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";

const CATALOG: Record<string, Record<string, ApiEndpoint>> = API_ENDPOINTS;

export function getApiEndpoint(key: ApiEndpointKey): ApiEndpointEntry {
  const [group, action] = key.split(".");
  return { ...CATALOG[group][action], key };
}
