import { describe, expect, it } from "vitest";

import { PRICING_RULES } from "@/constants/Modules/Catalogo/EsteiraCadastro/pricing";

import { getSuggestedPrice } from "./get-suggested-price";

describe("getSuggestedPrice", () => {
  it("aplica markup, desconta imposto e taxa e arredonda para os centavos configurados", () => {
    expect(getSuggestedPrice(100, PRICING_RULES)).toBe(146.97);
  });

  it("termina sempre nos centavos configurados", () => {
    const price = getSuggestedPrice(39.9, PRICING_RULES);
    expect(price?.toFixed(2).endsWith(".97")).toBe(true);
  });

  it("soma as deduções quando passam de 100%", () => {
    const rules = { taxPercent: 60, feePercent: 50, markupPercent: 0, roundingCents: 0.9 };
    expect(getSuggestedPrice(10, rules)).toBe(21.9);
  });

  it("não sugere preço sem custo", () => {
    expect(getSuggestedPrice(0, PRICING_RULES)).toBeNull();
  });
});
