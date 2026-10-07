import { describe, expect, it } from "vitest";

import { findPeakCell } from "./find-peak-cell";

describe("findPeakCell", () => {
  it("encontra o dia e a hora com mais pedidos", () => {
    expect(
      findPeakCell([
        [1, 2, 3],
        [4, 9, 1],
      ]),
    ).toEqual({ day: 1, hour: 1 });
  });

  it("mantém a primeira célula quando tudo é zero", () => {
    expect(findPeakCell([[0, 0]])).toEqual({ day: 0, hour: 0 });
  });
});
