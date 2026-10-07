import type { APIRequestContext, APIResponse } from "@playwright/test";

import { recordEndpointHit } from "./record-endpoint-hit";
import { retryRateLimited } from "./retry-rate-limited";

export async function bffRequest(
  request: APIRequestContext,
  method: string,
  url: string,
  options: { data?: unknown; headers?: Record<string, string>; test: string },
): Promise<APIResponse> {
  const response = await retryRateLimited(() =>
    request.fetch(url, { method, data: options.data, headers: options.headers }),
  );
  recordEndpointHit(method, response.url(), response.status(), options.test);
  return response;
}
