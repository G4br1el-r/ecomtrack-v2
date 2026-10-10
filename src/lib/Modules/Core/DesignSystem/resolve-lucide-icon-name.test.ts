import { describe, expect, it } from "vitest";

import { resolveLucideIconName } from "./resolve-lucide-icon-name";

describe("resolveLucideIconName", () => {
  it("aceita o nome em kebab-case do Lucide", () => {
    expect(resolveLucideIconName("layout-dashboard")).toBe("layout-dashboard");
  });

  it("converte PascalCase, camelCase e números para kebab-case", () => {
    expect(resolveLucideIconName("LayoutDashboard")).toBe("layout-dashboard");
    expect(resolveLucideIconName("userCog")).toBe("user-cog");
    expect(resolveLucideIconName("Building2")).toBe("building-2");
  });

  it("ignora espaços nas pontas e aceita sublinhado", () => {
    expect(resolveLucideIconName("  shield_check ")).toBe("shield-check");
  });

  it("devolve nulo para nome vazio ou que não existe no Lucide", () => {
    expect(resolveLucideIconName(null)).toBeNull();
    expect(resolveLucideIconName("")).toBeNull();
    expect(resolveLucideIconName("icone-que-nao-existe")).toBeNull();
  });
});
