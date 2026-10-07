import { describe, expect, it } from "vitest";

import { resolvePeriodPreset } from "./resolve-period-preset";

const TODAY = new Date(2026, 9, 4, 15, 30);

describe("resolvePeriodPreset", () => {
  it("últimos 7 dias inclui hoje e ignora o horário", () => {
    expect(resolvePeriodPreset("ultimos-7", TODAY)).toEqual({ from: new Date(2026, 8, 28), to: new Date(2026, 9, 4) });
  });

  it("esta semana vai de segunda a domingo", () => {
    expect(resolvePeriodPreset("esta-semana", TODAY)).toEqual({
      from: new Date(2026, 8, 28),
      to: new Date(2026, 9, 4),
    });
  });

  it("mês passado cobre o mês anterior inteiro", () => {
    expect(resolvePeriodPreset("mes-passado", TODAY)).toEqual({
      from: new Date(2026, 8, 1),
      to: new Date(2026, 8, 30),
    });
  });

  it("ontem é um único dia", () => {
    expect(resolvePeriodPreset("ontem", TODAY)).toEqual({ from: new Date(2026, 9, 3), to: new Date(2026, 9, 3) });
  });
});
