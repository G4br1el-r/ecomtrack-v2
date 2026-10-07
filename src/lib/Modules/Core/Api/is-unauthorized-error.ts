import { HTTP_STATUS } from "@/constants/Modules/Core/Api/http";

export function isUnauthorizedError(error: unknown): boolean {
  if (!(error instanceof Error) || typeof error.cause !== "object" || error.cause === null) return false;
  return "status" in error.cause && error.cause.status === HTTP_STATUS.unauthorized;
}
