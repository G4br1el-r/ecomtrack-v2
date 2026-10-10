import { describe, expect, it } from "vitest";

import { PERMISSION_MENU_MOCK } from "@/mocks/Modules/Core/Access/permission-menu";

import { findMenuEntry } from "./find-menu-entry";

describe("findMenuEntry", () => {
  it("acha a página pela rota exata com a seção dela", () => {
    const entry = findMenuEntry(PERMISSION_MENU_MOCK, "/administracao/usuarios");

    expect(entry?.page.code).toBe("usuarios");
    expect(entry?.section.name).toBe("Administração");
  });

  it("acha a página de uma sub-rota pelo prefixo mais longo", () => {
    const menu = [
      {
        ...PERMISSION_MENU_MOCK[1],
        pages: [
          { ...PERMISSION_MENU_MOCK[1].pages[1], code: "raiz", route: "/relatorios" },
          PERMISSION_MENU_MOCK[1].pages[1],
        ],
      },
    ];

    expect(findMenuEntry(menu, "/relatorios/todos/123")?.page.code).toBe("relatorios");
  });

  it("não confunde rota com prefixo parcial do nome", () => {
    expect(findMenuEntry(PERMISSION_MENU_MOCK, "/administracao/usuarios-extra")).toBeNull();
  });

  it("devolve nulo para rota fora do menu ou menu ausente", () => {
    expect(findMenuEntry(PERMISSION_MENU_MOCK, "/minha-conta")).toBeNull();
    expect(findMenuEntry(undefined, "/administracao/usuarios")).toBeNull();
  });
});
