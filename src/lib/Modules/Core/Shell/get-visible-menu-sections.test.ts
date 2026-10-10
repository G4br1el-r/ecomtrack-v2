import { describe, expect, it } from "vitest";

import { PERMISSION_MENU_MOCK } from "@/mocks/Modules/Core/Access/permission-menu";

import { getVisibleMenuSections } from "./get-visible-menu-sections";

describe("getVisibleMenuSections", () => {
  it("mantém só as páginas do menu que têm rota, incluindo as bloqueadas", () => {
    const sections = getVisibleMenuSections(PERMISSION_MENU_MOCK);

    expect(sections.map((section) => section.pages.map((page) => page.code))).toEqual([
      ["usuarios", "auditoria"],
      ["relatorios"],
    ]);
  });

  it("descarta seção sem nenhuma página visível", () => {
    const [admin] = PERMISSION_MENU_MOCK;
    expect(getVisibleMenuSections([{ ...admin, pages: [admin.pages[2]] }])).toEqual([]);
  });

  it("devolve lista vazia enquanto o menu não chegou", () => {
    expect(getVisibleMenuSections(undefined)).toEqual([]);
  });
});
