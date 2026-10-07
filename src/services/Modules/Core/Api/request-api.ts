import type { z } from "zod";

import type { ApiEndpoint } from "@/@types/Modules/Core/Api/api-endpoint";
import type { ApiRequestOptions } from "@/@types/Modules/Core/Api/api-request";
import { COMPANY_HEADER, HTTP_STATUS } from "@/constants/Modules/Core/Api/http";
import { SESSION_EXPIRED_ERROR } from "@/constants/Modules/Core/Auth/auth";
import { buildApiUrl } from "@/lib/Modules/Core/Api/build-api-url";
import { getLoginHref } from "@/lib/Modules/Core/Auth/get-login-href";
import { refreshAccessToken } from "@/services/Modules/Core/Auth/refresh-access-token";
import { useViewAsStore } from "@/store/Modules/Core/Access/view-as-store";
import { useSessionStore } from "@/store/Modules/Core/Auth/session-store";
import { useCompanyContextStore } from "@/store/Modules/Core/Shell/company-context-store";

import { parseApiResponse } from "./parse-api-response";

export async function requestApi<TSchema extends z.ZodType>(
  endpoint: ApiEndpoint,
  schema: TSchema,
  options: ApiRequestOptions = {},
): Promise<z.infer<TSchema>> {
  const url = buildApiUrl(endpoint, options);
  const send = () => {
    const { accessToken, user } = useSessionStore.getState();
    const viewAs = useViewAsStore.getState().session;
    const company = useCompanyContextStore.getState().company;
    const token = viewAs?.token ?? accessToken;
    const headers = new Headers();
    if (token) headers.set("Authorization", `Bearer ${token}`);
    const sendCompany = !viewAs && !options.skipCompany && !endpoint.platformScope;
    if (sendCompany && user?.isPlatformOwner && company) headers.set(COMPANY_HEADER, company.id);
    if (options.body !== undefined) headers.set("Content-Type", "application/json");
    return fetch(url, {
      method: endpoint.method,
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
    }).catch(() => null);
  };

  let response = await send();
  if (response?.status === HTTP_STATUS.unauthorized && useViewAsStore.getState().session) {
    useViewAsStore.getState().stop();
    response = await send();
  }
  if (response?.status === HTTP_STATUS.unauthorized && !endpoint.isPublic) {
    const tokens = await refreshAccessToken();
    if (!tokens) {
      window.location.assign(getLoginHref(window.location.pathname));
      throw new Error(SESSION_EXPIRED_ERROR.message, { cause: { status: HTTP_STATUS.unauthorized } });
    }
    response = await send();
  }
  return parseApiResponse(response, schema);
}
