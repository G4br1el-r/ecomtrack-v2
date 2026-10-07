import type { ApiEndpoint } from "@/@types/Modules/Core/Api/api-endpoint";
import type { ApiRequestOptions } from "@/@types/Modules/Core/Api/api-request";
import { API_PROXY_BASE_PATH } from "@/constants/Modules/Core/Api/http";

const PATH_PARAM_PATTERN = /\{(\w+)\}/g;

export function buildApiUrl(endpoint: ApiEndpoint, { params = {}, query = {} }: ApiRequestOptions = {}): string {
  const path = endpoint.path.replace(PATH_PARAM_PATTERN, (_, name: string) => {
    const value = params[name];
    if (value === undefined) throw new Error(`Parâmetro "${name}" faltando para ${endpoint.path}.`);
    return encodeURIComponent(value);
  });
  const search = new URLSearchParams();
  for (const [name, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== "") search.set(name, String(value));
  }
  const queryString = search.toString();
  return `${API_PROXY_BASE_PATH}${path}${queryString ? `?${queryString}` : ""}`;
}
