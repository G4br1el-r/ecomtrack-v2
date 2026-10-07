import { describe, expect, it } from "vitest";

import { getBreadcrumbs } from "./get-breadcrumbs";

describe("getBreadcrumbs", () => {
  it("monta grupo e página a partir da navegação", () => {
    expect(getBreadcrumbs("/vendas/pedidos")).toEqual([{ label: "Operacional" }, { label: "Pedidos" }]);
  });

  it("aponta o hub de relatórios para relatórios específicos", () => {
    expect(getBreadcrumbs("/relatorios/curva-abc")).toEqual([
      { label: "Supervisão", href: "/relatorios/todos" },
      { label: "Curva ABC" },
    ]);
  });

  it("usa um rótulo neutro para rota desconhecida", () => {
    expect(getBreadcrumbs("/nao/existe")).toEqual([{ label: "Página não encontrada" }]);
  });
});
