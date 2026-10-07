import { describe, expect, it } from "vitest";

import { EMPTY_PERIOD_LABEL } from "@/constants/Modules/Core/DesignSystem/period-presets";

import { formatPeriodLabel } from "./format-period-label";

const TODAY = new Date(2026, 9, 4);

describe("formatPeriodLabel", () => {
  it("mostra o texto padrão sem data inicial", () => {
    expect(formatPeriodLabel({})).toBe(EMPTY_PERIOD_LABEL);
  });

  it("mostra uma data quando início e fim são o mesmo dia", () => {
    expect(formatPeriodLabel({ from: TODAY, to: TODAY })).toBe("04/10/2026");
  });

  it("mostra mês e ano quando o intervalo é o mês inteiro", () => {
    expect(formatPeriodLabel({ from: new Date(2026, 8, 1), to: new Date(2026, 8, 30) })).toBe("Setembro 2026");
  });

  it("mostra o intervalo quando não é mês inteiro", () => {
    expect(formatPeriodLabel({ from: new Date(2026, 8, 2), to: new Date(2026, 8, 30) })).toBe(
      "02/09/2026 - 30/09/2026",
    );
  });
});
