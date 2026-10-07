import { expect } from "@playwright/test";

import { FAKE_ID, FIRST_SERVER_ERROR } from "../constants";
import type { OwnerApi } from "../fixtures";

const FIRST_CLIENT_ERROR = 400;

export async function expectUnknownConnectionRejected(ownerApi: OwnerApi, basePath: string, companyId: string) {
  const body = { providerId: FAKE_ID, name: "E2E", isActive: true, values: {} };
  const responses = [
    await ownerApi.call("POST", basePath, { body, companyId }),
    await ownerApi.call("GET", `${basePath}/${FAKE_ID}`, { companyId }),
    await ownerApi.call("PUT", `${basePath}/${FAKE_ID}`, { body, companyId }),
    await ownerApi.call("DELETE", `${basePath}/${FAKE_ID}`, { companyId }),
  ];
  for (const response of responses) {
    expect(response.status()).toBeGreaterThanOrEqual(FIRST_CLIENT_ERROR);
    expect(response.status()).toBeLessThan(FIRST_SERVER_ERROR);
  }
}
