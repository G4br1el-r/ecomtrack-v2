import { describe, expect, it } from "vitest";

import { resolveActivePathname } from "./resolve-active-pathname";

describe("resolveActivePathname", () => {
  it("usa o pathname quando não há navegação pendente", () => {
    expect(resolveActivePathname("/vendas/pedidos", null)).toBe("/vendas/pedidos");
  });

  it("usa o destino enquanto a rota de origem não mudou", () => {
    expect(resolveActivePathname("/vendas/pedidos", { href: "/catalogo/marcas", from: "/vendas/pedidos" })).toBe(
      "/catalogo/marcas",
    );
  });

  it("volta ao pathname quando a rota muda", () => {
    expect(resolveActivePathname("/operacao/envios", { href: "/catalogo/marcas", from: "/vendas/pedidos" })).toBe(
      "/operacao/envios",
    );
  });
});
