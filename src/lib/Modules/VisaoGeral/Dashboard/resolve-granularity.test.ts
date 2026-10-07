import { addDays } from "date-fns";
import { describe, expect, it } from "vitest";

import { resolveGranularity } from "./resolve-granularity";

const START = new Date(2026, 0, 1);

function rangeOf(days: number) {
  return { from: START, to: addDays(START, days - 1) };
}

describe("resolveGranularity", () => {
  it("agrupa por dia até 31 dias", () => {
    expect(resolveGranularity(rangeOf(1))).toBe("day");
    expect(resolveGranularity(rangeOf(31))).toBe("day");
  });

  it("agrupa por semana até 180 dias", () => {
    expect(resolveGranularity(rangeOf(32))).toBe("week");
    expect(resolveGranularity(rangeOf(180))).toBe("week");
  });

  it("agrupa por mês acima de 180 dias", () => {
    expect(resolveGranularity(rangeOf(181))).toBe("month");
  });
});
