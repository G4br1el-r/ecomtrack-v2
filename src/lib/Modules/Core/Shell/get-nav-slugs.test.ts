import { describe, expect, it } from "vitest";

import { NAV_GROUPS, REPORT_LINKS } from "@/constants/Modules/Core/Shell/navigation";

import { getNavSlugs } from "./get-nav-slugs";

describe("getNavSlugs", () => {
  it("quebra cada rota do menu em segmentos", () => {
    expect(getNavSlugs()).toContainEqual({ slug: ["vendas", "pedidos"] });
  });

  it("inclui os relatórios", () => {
    expect(getNavSlugs()).toContainEqual({ slug: ["relatorios", "curva-abc"] });
  });

  it("gera uma entrada por item de navegação", () => {
    const total = NAV_GROUPS.reduce((sum, group) => sum + group.items.length, 0) + REPORT_LINKS.length;
    expect(getNavSlugs()).toHaveLength(total);
  });
});
