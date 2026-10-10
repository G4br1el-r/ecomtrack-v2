import { describe, expect, it } from "vitest";

import type { PagePermissionComponents } from "@/schemas/Modules/Core/Access/page-permission-components-schema";

import { hasPermission } from "./has-permission";

const USERS_PAGE: PagePermissionComponents = {
  pageCode: "usuarios",
  pageEnabled: true,
  components: [
    { code: "usuarios.editarusuarios", name: "Editar", description: null, icon: "pencil", enabled: true },
    { code: "usuarios.desativarusuario", name: "Desativar", description: null, icon: null, enabled: false },
  ],
};

describe("hasPermission", () => {
  it("libera o componente habilitado da página", () => {
    expect(hasPermission(USERS_PAGE, "usuarios.editarusuarios")).toBe(true);
  });

  it("bloqueia componente desabilitado ou que não existe na página", () => {
    expect(hasPermission(USERS_PAGE, "usuarios.desativarusuario")).toBe(false);
    expect(hasPermission(USERS_PAGE, "usuarios.inexistente")).toBe(false);
  });

  it("sem componente informado, responde se a página está liberada", () => {
    expect(hasPermission(USERS_PAGE)).toBe(true);
    expect(hasPermission({ ...USERS_PAGE, pageEnabled: false })).toBe(false);
  });

  it("bloqueia tudo quando a página está bloqueada", () => {
    expect(hasPermission({ ...USERS_PAGE, pageEnabled: false }, "usuarios.editarusuarios")).toBe(false);
  });

  it("bloqueia enquanto as permissões não chegaram", () => {
    expect(hasPermission(undefined, "usuarios.editarusuarios")).toBe(false);
  });
});
