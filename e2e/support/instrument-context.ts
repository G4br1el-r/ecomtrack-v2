import type { BrowserContext } from "@playwright/test";

import { RATE_LIMITED_PATTERNS } from "../constants";
import { recordEndpointHit } from "./record-endpoint-hit";
import { retryRateLimited } from "./retry-rate-limited";

export async function instrumentContext(context: BrowserContext, currentTest: () => string) {
  for (const pattern of RATE_LIMITED_PATTERNS) {
    await context.route(pattern, async (route) => {
      const response = await retryRateLimited(() => route.fetch()).catch(() => null);
      if (response) await route.fulfill({ response }).catch(() => undefined);
    });
  }
  context.on("response", (response) =>
    recordEndpointHit(response.request().method(), response.url(), response.status(), currentTest()),
  );
}
