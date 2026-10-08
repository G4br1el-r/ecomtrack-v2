export function getApiErrorStatus(error: unknown): number | undefined {
  if (!(error instanceof Error) || typeof error.cause !== "object" || error.cause === null) return undefined;
  return "status" in error.cause && typeof error.cause.status === "number" ? error.cause.status : undefined;
}
