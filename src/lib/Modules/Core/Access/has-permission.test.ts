import { describe, expect, it } from "vitest";

import type { ProfilePermissions } from "@/schemas/Modules/Core/Access/profile-permissions-schema";

import { hasPermission } from "./has-permission";

const COMPANY_PROFILE: ProfilePermissions = {
  profileId: "p1",
  profileName: "Vendas",
  version: 1,
  kind: "Company",
  pages: [
    {
      code: "usuarios",
      name: "Usuários",
      description: null,
      route: "/usuarios",
      icon: null,
      showInMenu: true,
      sortOrder: 1,
      section: null,
    },
  ],
  components: ["usuarios.editarusuarios"],
};

describe("hasPermission", () => {
  it("libera página e componente do perfil", () => {
    expect(hasPermission(COMPANY_PROFILE, "usuarios")).toBe(true);
    expect(hasPermission(COMPANY_PROFILE, "usuarios.editarusuarios")).toBe(true);
  });

  it("bloqueia o que não está no perfil", () => {
    expect(hasPermission(COMPANY_PROFILE, "usuarios.desativarusuario")).toBe(false);
    expect(hasPermission(COMPANY_PROFILE, "empresas")).toBe(false);
  });

  it("libera tudo para o Owner", () => {
    expect(hasPermission({ ...COMPANY_PROFILE, kind: "Owner", pages: [], components: [] }, "empresas")).toBe(true);
  });

  it("bloqueia enquanto as permissões não chegaram", () => {
    expect(hasPermission(undefined, "usuarios")).toBe(false);
  });
});
