import { describe, expect, it } from "vitest";

import { buildPermissionsHubUrl } from "./build-permissions-hub-url";

describe("buildPermissionsHubUrl", () => {
  it("monta o endereço do hub de permissões a partir da URL da API", () => {
    expect(buildPermissionsHubUrl("https://localhost:7251")).toBe("https://localhost:7251/hubs/permissions");
  });

  it("ignora a barra final da URL da API", () => {
    expect(buildPermissionsHubUrl("https://api.ecomtrack.com/")).toBe("https://api.ecomtrack.com/hubs/permissions");
  });

  it("devolve nulo sem URL configurada", () => {
    expect(buildPermissionsHubUrl(undefined)).toBeNull();
    expect(buildPermissionsHubUrl("")).toBeNull();
  });
});
