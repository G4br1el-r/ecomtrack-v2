import { describe, expect, it } from "vitest";

import { matchEndpointKey } from "./match-endpoint-key";

describe("matchEndpointKey", () => {
  it.each([
    ["GET", "/api/modules/core/ecomtrack/users?Page=1", "users.list"],
    ["GET", "/api/modules/core/ecomtrack/users/invites", "invites.list"],
    ["GET", "/api/modules/core/ecomtrack/users/abc", "users.get"],
    ["GET", "/api/modules/core/ecomtrack/profiles/catalog", "profiles.catalog"],
    ["GET", "/api/modules/core/ecomtrack/companies/me", "companies.mine"],
    ["POST", "/api/modules/core/ecomtrack/companies/abc/suspend", "companies.suspend"],
    ["POST", "/api/modules/core/auth/refresh", "auth.refresh"],
    ["GET", "http://localhost:3100/api/modules/core/ecomtrack/auth/invites/tok", "auth.getInvite"],
  ])("%s %s vira %s", (method, url, key) => {
    expect(matchEndpointKey(method, url)).toBe(key);
  });

  it("ignora o que não passa pelo BFF", () => {
    expect(matchEndpointKey("GET", "/administracao/usuarios")).toBeNull();
  });
});
