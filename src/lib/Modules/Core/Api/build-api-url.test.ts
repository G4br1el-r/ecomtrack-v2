import { describe, expect, it } from "vitest";

import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";

import { buildApiUrl } from "./build-api-url";

describe("buildApiUrl", () => {
  it("monta a rota do repasse da API", () => {
    expect(buildApiUrl(API_ENDPOINTS.users.list)).toBe("/api/modules/core/ecomtrack/users");
  });

  it("troca os parâmetros do caminho com codificação", () => {
    expect(buildApiUrl(API_ENDPOINTS.communication.getNotification, { params: { key: "login code" } })).toBe(
      "/api/modules/core/ecomtrack/communication/notifications/login%20code",
    );
  });

  it("monta a busca ignorando valores vazios", () => {
    expect(
      buildApiUrl(API_ENDPOINTS.users.list, {
        query: { Page: 2, PageSize: 20, Search: "", Status: undefined, ProfileId: null, IncludeAll: false },
      }),
    ).toBe("/api/modules/core/ecomtrack/users?Page=2&PageSize=20&IncludeAll=false");
  });

  it("avisa quando falta parâmetro do caminho", () => {
    expect(() => buildApiUrl(API_ENDPOINTS.users.get)).toThrow('Parâmetro "id" faltando para /users/{id}.');
  });
});
