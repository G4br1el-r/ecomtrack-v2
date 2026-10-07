import { Palette, ShoppingCart } from "lucide-react";
import { describe, expect, it } from "vitest";

import { findNavEntry } from "./find-nav-entry";

describe("findNavEntry", () => {
  it("encontra item do menu com grupo e ícone", () => {
    expect(findNavEntry("/vendas/pedidos")).toEqual({
      title: "Pedidos",
      groupLabel: "Operacional",
      icon: ShoppingCart,
    });
  });

  it("encontra relatório apontando para o hub de supervisão", () => {
    expect(findNavEntry("/relatorios/curva-abc")).toEqual({
      title: "Curva ABC",
      groupLabel: "Supervisão",
      groupHref: "/relatorios/todos",
    });
  });

  it("encontra o design system no grupo de desenvolvimento", () => {
    expect(findNavEntry("/components")).toEqual({
      title: "Design System",
      groupLabel: "Desenvolvimento",
      icon: Palette,
    });
  });

  it("retorna null para rota desconhecida", () => {
    expect(findNavEntry("/nao/existe")).toBeNull();
  });
});
