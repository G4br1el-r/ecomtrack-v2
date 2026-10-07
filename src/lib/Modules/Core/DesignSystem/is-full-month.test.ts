import { describe, expect, it } from "vitest";

import { isFullMonth } from "./is-full-month";

describe("isFullMonth", () => {
  it("reconhece o mês inteiro", () => {
    expect(isFullMonth(new Date(2026, 8, 1), new Date(2026, 8, 30))).toBe(true);
  });

  it("rejeita intervalo parcial", () => {
    expect(isFullMonth(new Date(2026, 8, 2), new Date(2026, 8, 30))).toBe(false);
  });

  it("rejeita meses diferentes", () => {
    expect(isFullMonth(new Date(2026, 7, 1), new Date(2026, 8, 30))).toBe(false);
  });
});
