import { describe, expect, it } from "vitest";

import { NAV_GROUPS, REPORT_LINKS } from "./navigation";

const MODULE_PAGE_PATH = /^\/[a-z-]+\/[a-z-]+$/;
const PUBLIC_PAGE_PATH = /^\/[a-z-]+$/;

describe("navegação", () => {
  const hrefs = [
    ...NAV_GROUPS.flatMap((group) => group.items.map((item) => item.href)),
    ...REPORT_LINKS.map((link) => link.href),
  ];

  it("não repete hrefs", () => {
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("segue o padrão /<modulo>/<pagina>, exceto páginas públicas", () => {
    expect(hrefs.every((href) => MODULE_PAGE_PATH.test(href) || PUBLIC_PAGE_PATH.test(href))).toBe(true);
  });

  it("não tem grupo vazio", () => {
    expect(NAV_GROUPS.every((group) => group.items.length > 0)).toBe(true);
  });
});
