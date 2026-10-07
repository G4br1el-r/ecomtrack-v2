import { describe, expect, it } from "vitest";

import { distributeByWeights } from "./distribute-by-weights";

describe("distributeByWeights", () => {
  it("reparte o total na proporção dos pesos", () => {
    expect(distributeByWeights(100, [1, 3])).toEqual([25, 75]);
  });

  it("mantém a soma igual ao total", () => {
    const parts = distributeByWeights(90, [0.2, 0.5, 0.31]);
    expect(parts.reduce((sum, part) => sum + part, 0)).toBeCloseTo(90);
  });

  it("devolve zeros quando todos os pesos são zero", () => {
    expect(distributeByWeights(10, [0, 0])).toEqual([0, 0]);
  });
});
