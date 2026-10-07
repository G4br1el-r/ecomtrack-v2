import { describe, expect, it } from "vitest";

import { findActivePreset } from "./find-active-preset";
import { resolvePeriodPreset } from "./resolve-period-preset";

const TODAY = new Date(2026, 9, 4);

describe("findActivePreset", () => {
  it("reconhece o preset correspondente ao intervalo", () => {
    expect(findActivePreset(resolvePeriodPreset("este-mes", TODAY), TODAY)).toBe("este-mes");
  });

  it("retorna undefined para intervalo personalizado", () => {
    expect(findActivePreset({ from: new Date(2026, 8, 3), to: new Date(2026, 8, 5) }, TODAY)).toBeUndefined();
  });

  it("retorna undefined para intervalo incompleto", () => {
    expect(findActivePreset({ from: TODAY }, TODAY)).toBeUndefined();
  });
});
