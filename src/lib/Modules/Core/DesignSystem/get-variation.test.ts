import { describe, expect, it } from "vitest";

import { getVariation } from "./get-variation";

describe("getVariation", () => {
  it("calcula a variação relativa ao período anterior", () => {
    expect(getVariation(150, 100)).toBe(0.5);
    expect(getVariation(80, 100)).toBe(-0.2);
  });

  it("não existe variação quando o período anterior é zero", () => {
    expect(getVariation(100, 0)).toBeNull();
  });
});
