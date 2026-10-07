import { describe, expect, it } from "vitest";

import { PIPELINE_PRODUCTS_MOCK } from "@/mocks/Modules/Catalogo/EsteiraCadastro/pipeline-products";

import { filterByStage } from "./filter-by-stage";

describe("filterByStage", () => {
  it("mantém só os produtos com situação da etapa", () => {
    const products = filterByStage(PIPELINE_PRODUCTS_MOCK, "precificacao");
    expect(products.length).toBeGreaterThan(0);
    expect(products.every((product) => ["aguardando-preco", "aguardando-aprovacao"].includes(product.status))).toBe(
      true,
    );
  });

  it("devolve vazio sem produtos", () => {
    expect(filterByStage([], "cadastro")).toEqual([]);
  });
});
