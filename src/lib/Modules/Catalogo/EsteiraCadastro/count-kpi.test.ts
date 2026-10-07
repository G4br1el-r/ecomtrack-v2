import { describe, expect, it } from "vitest";

import type { StageKpiConfig } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-stage";
import { PIPELINE_STAGE_KPIS } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline-kpis";
import { PIPELINE_PRODUCTS_MOCK } from "@/mocks/Modules/Catalogo/EsteiraCadastro/pipeline-products";

import { countKpi } from "./count-kpi";

const [PRODUCT] = PIPELINE_PRODUCTS_MOCK;
const NOW = new Date("2026-10-06T12:00:00");
const [A_CLASSIFICAR] = PIPELINE_STAGE_KPIS.importacao;
const RECENT: StageKpiConfig = { ...A_CLASSIFICAR, statuses: ["ativo"], recentDays: 30 };

describe("countKpi", () => {
  it("soma todas as situações do indicador", () => {
    const products = [
      { ...PRODUCT, status: "disponivel" as const },
      { ...PRODUCT, status: "indisponivel" as const },
      { ...PRODUCT, status: "ignorado" as const },
    ];
    expect(countKpi(products, A_CLASSIFICAR, NOW)).toBe(2);
  });

  it("conta só os atualizados dentro da janela de dias", () => {
    const products = [
      { ...PRODUCT, status: "ativo" as const, updatedAt: "2026-09-10T10:00:00" },
      { ...PRODUCT, status: "ativo" as const, updatedAt: "2026-08-01T10:00:00" },
    ];
    expect(countKpi(products, RECENT, NOW)).toBe(1);
  });

  it("devolve zero sem produtos", () => {
    expect(countKpi([], A_CLASSIFICAR, NOW)).toBe(0);
  });
});
