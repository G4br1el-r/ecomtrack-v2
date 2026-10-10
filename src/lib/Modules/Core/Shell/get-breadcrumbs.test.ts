import { describe, expect, it } from "vitest";

import { PERMISSION_MENU_MOCK } from "@/mocks/Modules/Core/Access/permission-menu";

import { getBreadcrumbs } from "./get-breadcrumbs";

describe("getBreadcrumbs", () => {
  it("monta seção e página a partir do menu da API", () => {
    expect(getBreadcrumbs(PERMISSION_MENU_MOCK, "/administracao/usuarios")).toEqual([
      { label: "Administração" },
      { label: "Usuários" },
    ]);
  });

  it("mostra só a página quando ela não tem seção", () => {
    expect(getBreadcrumbs(PERMISSION_MENU_MOCK, "/relatorios/todos")).toEqual([{ label: "Relatórios" }]);
  });

  it("usa um rótulo neutro para rota desconhecida", () => {
    expect(getBreadcrumbs(PERMISSION_MENU_MOCK, "/nao/existe")).toEqual([{ label: "Página não encontrada" }]);
  });
});
