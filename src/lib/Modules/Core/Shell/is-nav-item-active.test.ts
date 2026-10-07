import { describe, expect, it } from "vitest";

import { isNavItemActive } from "./is-nav-item-active";

const HREF = "/vendas/pedidos";

describe("isNavItemActive", () => {
  it("acende na rota exata", () => {
    expect(isNavItemActive("/vendas/pedidos", HREF)).toBe(true);
  });

  it("acende em rota filha", () => {
    expect(isNavItemActive("/vendas/pedidos/123", HREF)).toBe(true);
  });

  it("não acende em rota com prefixo parecido", () => {
    expect(isNavItemActive("/vendas/pedidos-x", HREF)).toBe(false);
  });

  it("não acende em outra rota", () => {
    expect(isNavItemActive("/vendas/clientes", HREF)).toBe(false);
  });
});
