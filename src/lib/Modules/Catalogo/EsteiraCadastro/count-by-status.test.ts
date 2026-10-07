import { describe, expect, it } from "vitest";

import { PIPELINE_PRODUCTS_MOCK } from "@/mocks/Modules/Catalogo/EsteiraCadastro/pipeline-products";

import { countByStatus } from "./count-by-status";

describe("countByStatus", () => {
  it("conta os produtos de cada situação", () => {
    const [first, second] = PIPELINE_PRODUCTS_MOCK;
    expect(countByStatus([first, second, { ...first, status: "ignorado" }])).toEqual({
      disponivel: 2,
      ignorado: 1,
    });
  });

  it("devolve vazio sem produtos", () => {
    expect(countByStatus([])).toEqual({});
  });
});
