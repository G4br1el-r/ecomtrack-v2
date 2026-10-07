import { describe, expect, it } from "vitest";

import { PRICING_RULES } from "@/constants/Modules/Catalogo/EsteiraCadastro/pricing";

import { getNetResult } from "./get-net-result";

describe("getNetResult", () => {
  it("desconta imposto, taxa e custo do preço de venda", () => {
    const result = getNetResult(100, 50, PRICING_RULES);
    expect(result?.profit).toBeCloseTo(38.51);
    expect(result?.margin).toBeCloseTo(0.3851);
  });

  it("devolve margem negativa quando o preço não cobre custo e deduções", () => {
    expect(getNetResult(100, 95, PRICING_RULES)?.margin).toBeLessThan(0);
  });

  it("não calcula sem preço ou sem custo", () => {
    expect(getNetResult(null, 50, PRICING_RULES)).toBeNull();
    expect(getNetResult(100, 0, PRICING_RULES)).toBeNull();
  });
});
