import { RATE_LIMIT_MAX_ATTEMPTS, RATE_LIMIT_RETRY_MS, TOO_MANY_REQUESTS } from "../constants";

export async function retryRateLimited<T extends { status: () => number }>(send: () => Promise<T>): Promise<T> {
  for (let attempt = 1; ; attempt += 1) {
    const response = await send();
    if (response.status() !== TOO_MANY_REQUESTS || attempt >= RATE_LIMIT_MAX_ATTEMPTS) return response;
    await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT_RETRY_MS));
  }
}
