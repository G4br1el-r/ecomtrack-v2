import { describe, expect, it, vi } from "vitest";

import { PIPELINE_STAGE_IDS, PIPELINE_STAGES } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline";

import { getExchangeRates } from "./get-exchange-rates";
import { getPipelineProducts } from "./get-pipeline-products";

vi.mock("@/lib/Modules/Core/Shell/wait", () => ({ wait: () => Promise.resolve() }));

describe("getPipelineProducts", () => {
  it("devolve produtos em todas as etapas da esteira", async () => {
    const products = await getPipelineProducts();
    for (const stage of PIPELINE_STAGE_IDS) {
      const statuses: readonly string[] = PIPELINE_STAGES[stage].statuses;
      expect(products.some((product) => statuses.includes(product.status))).toBe(true);
    }
  });

  it("usa ids únicos", async () => {
    const products = await getPipelineProducts();
    expect(new Set(products.map((product) => product.id)).size).toBe(products.length);
  });
});

describe("getExchangeRates", () => {
  it("devolve as cotações com a fonte", async () => {
    const rates = await getExchangeRates();
    expect(rates.source).toContain("PTAX");
    expect(rates.rates.map((rate) => rate.currency)).toEqual(["USD", "EUR", "GBP"]);
  });
});
