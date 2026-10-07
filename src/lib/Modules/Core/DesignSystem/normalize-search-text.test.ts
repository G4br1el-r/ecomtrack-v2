import { describe, expect, it } from "vitest";

import { normalizeSearchText } from "./normalize-search-text";

describe("normalizeSearchText", () => {
  it("remove acentos, espaços das pontas e caixa alta", () => {
    expect(normalizeSearchText("  Ação ÚNICA ")).toBe("acao unica");
  });
});
