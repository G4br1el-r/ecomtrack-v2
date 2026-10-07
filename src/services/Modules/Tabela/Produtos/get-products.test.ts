import { describe, expect, it, vi } from "vitest";

import { PRODUCTS_MOCK } from "@/mocks/Modules/Tabela/Produtos/products";

import { getProducts } from "./get-products";

vi.mock("@/lib/Modules/Core/Shell/wait", () => ({ wait: () => Promise.resolve() }));

describe("getProducts", () => {
  it("devolve a lista de produtos", async () => {
    expect(await getProducts()).toEqual(PRODUCTS_MOCK);
  });
});
