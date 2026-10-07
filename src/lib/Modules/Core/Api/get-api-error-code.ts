export function getApiErrorCode(error: unknown): string | undefined {
  if (!(error instanceof Error) || typeof error.cause !== "object" || error.cause === null) return undefined;
  return "code" in error.cause && typeof error.cause.code === "string" ? error.cause.code : undefined;
}
