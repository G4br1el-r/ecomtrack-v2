import { describe, expect, it } from "vitest";

import type { CatalogPage } from "@/schemas/Modules/Core/Access/catalog-page-schema";

import { groupCatalogBySection } from "./group-catalog-by-section";
import { togglePermissionComponent } from "./toggle-permission-component";
import { togglePermissionPage } from "./toggle-permission-page";

const USERS: CatalogPage = {
  code: "usuarios",
  name: "Usuários",
  description: null,
  icon: null,
  sectionName: "Administração",
  sortOrder: 2,
  components: [
    { code: "usuarios.editarusuarios", name: "Editar", description: null, icon: null },
    { code: "usuarios.verlogs", name: "Ver logs", description: null, icon: null },
  ],
};

const DASHBOARD: CatalogPage = {
  ...USERS,
  code: "dashboard",
  name: "Dashboard",
  sectionName: null,
  sortOrder: 1,
  components: [],
};

describe("permissões", () => {
  it("agrupa o catálogo por seção na ordem do menu", () => {
    expect(groupCatalogBySection([USERS, DASHBOARD])).toEqual([
      { name: "Geral", pages: [DASHBOARD] },
      { name: "Administração", pages: [USERS] },
    ]);
  });

  it("desmarcar a página tira os componentes dela", () => {
    const selection = { pages: ["usuarios", "dashboard"], components: ["usuarios.verlogs", "outro.x"] };

    expect(togglePermissionPage(selection, USERS, false)).toEqual({ pages: ["dashboard"], components: ["outro.x"] });
  });

  it("marcar a página não duplica", () => {
    const selection = { pages: ["usuarios"], components: [] };

    expect(togglePermissionPage(selection, USERS, true)).toBe(selection);
    expect(togglePermissionPage({ pages: [], components: [] }, USERS, true)).toEqual({
      pages: ["usuarios"],
      components: [],
    });
  });

  it("marcar um componente garante a página dele", () => {
    expect(togglePermissionComponent({ pages: [], components: [] }, "usuarios", "usuarios.verlogs", true)).toEqual({
      pages: ["usuarios"],
      components: ["usuarios.verlogs"],
    });
  });

  it("desmarcar um componente mantém a página", () => {
    expect(
      togglePermissionComponent(
        { pages: ["usuarios"], components: ["usuarios.verlogs"] },
        "usuarios",
        "usuarios.verlogs",
        false,
      ),
    ).toEqual({ pages: ["usuarios"], components: [] });
  });
});
