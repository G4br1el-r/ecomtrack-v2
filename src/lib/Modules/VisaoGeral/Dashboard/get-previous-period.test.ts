import { describe, expect, it } from "vitest";

import { getPreviousPeriod } from "./get-previous-period";

describe("getPreviousPeriod", () => {
  it("devolve o intervalo de mesma duração imediatamente anterior", () => {
    const previous = getPreviousPeriod({ from: new Date(2026, 8, 5), to: new Date(2026, 9, 4) });
    expect(previous).toEqual({ from: new Date(2026, 7, 6), to: new Date(2026, 8, 4) });
  });

  it("compara um dia com o dia anterior", () => {
    const day = new Date(2026, 9, 4);
    expect(getPreviousPeriod({ from: day, to: day })).toEqual({ from: new Date(2026, 9, 3), to: new Date(2026, 9, 3) });
  });
});
