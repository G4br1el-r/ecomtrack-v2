import type { ApiEndpoint } from "@/@types/Modules/Core/Api/api-endpoint";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import type { PagePermissionComponents } from "@/schemas/Modules/Core/Access/page-permission-components-schema";

const CATALOG: Record<string, Record<string, ApiEndpoint>> = API_ENDPOINTS;

export function ownerPagePermissionsMock(pageCode: string): PagePermissionComponents {
  const codes = new Set(
    Object.values(CATALOG)
      .flatMap((group) => Object.values(group))
      .filter((endpoint) => endpoint.page === pageCode && endpoint.component)
      .map((endpoint) => endpoint.component ?? ""),
  );
  return {
    pageCode,
    pageEnabled: true,
    components: [...codes].map((code) => ({ code, name: code, description: null, icon: null, enabled: true })),
  };
}
