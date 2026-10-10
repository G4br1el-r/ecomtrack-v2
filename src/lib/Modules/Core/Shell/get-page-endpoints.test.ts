import { describe, expect, it } from "vitest";

import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { PAGE_ENDPOINT_KEYS, SHELL_ENDPOINT_KEYS } from "@/constants/Modules/Core/Shell/page-endpoints";

import { getPageEndpoints } from "./get-page-endpoints";

const TOTAL_ENDPOINTS = 90;
const USERS_PAGE_ENDPOINTS = 21;

describe("getPageEndpoints", () => {
  it("devolve os endpoints da página com método, caminho e resumo do catálogo", () => {
    const { page } = getPageEndpoints("/administracao/usuarios");

    expect(page).toHaveLength(USERS_PAGE_ENDPOINTS);
    expect(page[0]).toEqual({ ...API_ENDPOINTS.users.list, key: "users.list" });
  });

  it("acha a página de uma rota com parâmetro", () => {
    expect(getPageEndpoints("/redefinir-senha/abc123").page.map((endpoint) => endpoint.key)).toEqual([
      "auth.resetPassword",
    ]);
  });

  it("devolve lista vazia na página que ainda não usa a API", () => {
    expect(getPageEndpoints("/visao-geral/dashboard").page).toEqual([]);
  });

  it("sempre devolve os endpoints da casca do app", () => {
    expect(getPageEndpoints("/visao-geral/dashboard").shell.map((endpoint) => endpoint.key)).toEqual(
      SHELL_ENDPOINT_KEYS,
    );
  });

  it("cobre todos os endpoints da API entre páginas e casca", () => {
    const mapped = new Set([...Object.values(PAGE_ENDPOINT_KEYS).flat(), ...SHELL_ENDPOINT_KEYS]);
    const catalog = Object.entries(API_ENDPOINTS).flatMap(([group, actions]) =>
      Object.keys(actions).map((action) => `${group}.${action}`),
    );

    expect(catalog).toHaveLength(TOTAL_ENDPOINTS);
    expect(catalog.filter((key) => !mapped.has(key as never))).toEqual([]);
  });
});
