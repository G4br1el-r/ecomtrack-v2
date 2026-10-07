import type { ApiEndpointEntry } from "@/@types/Modules/Core/Api/api-endpoint-key";
import { PAGE_ENDPOINT_KEYS, SHELL_ENDPOINT_KEYS } from "@/constants/Modules/Core/Shell/page-endpoints";
import { getApiEndpoint } from "@/lib/Modules/Core/Api/get-api-endpoint";

export function getPageEndpoints(pathname: string): { page: ApiEndpointEntry[]; shell: ApiEndpointEntry[] } {
  const route = Object.keys(PAGE_ENDPOINT_KEYS)
    .filter((candidate) => pathname === candidate || pathname.startsWith(`${candidate}/`))
    .sort((first, second) => second.length - first.length)[0];
  return {
    page: (route ? PAGE_ENDPOINT_KEYS[route] : []).map(getApiEndpoint),
    shell: SHELL_ENDPOINT_KEYS.map(getApiEndpoint),
  };
}
