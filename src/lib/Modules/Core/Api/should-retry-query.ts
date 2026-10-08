import { HTTP_STATUS } from "@/constants/Modules/Core/Api/http";
import { QUERY_RETRY_COUNT } from "@/constants/Modules/Core/Shell/query-client";

import { getApiErrorStatus } from "./get-api-error-status";

export function shouldRetryQuery(failureCount: number, error: unknown): boolean {
  if (failureCount >= QUERY_RETRY_COUNT) return false;
  const status = getApiErrorStatus(error);
  return status === undefined || status >= HTTP_STATUS.internalServerError;
}
