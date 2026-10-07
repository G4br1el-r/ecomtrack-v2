import { describe, expect, it } from "vitest";

import { getStrokePoints } from "./get-stroke-points";

describe("getStrokePoints", () => {
  it("retorna só o destino quando não houve deslocamento", () => {
    expect(getStrokePoints({ x: 5, y: 5 }, { x: 5, y: 5 }, 4)).toEqual([{ x: 5, y: 5 }]);
  });

  it("preenche o trajeto em passos regulares até o destino", () => {
    expect(getStrokePoints({ x: 0, y: 0 }, { x: 12, y: 0 }, 4)).toEqual([
      { x: 4, y: 0 },
      { x: 8, y: 0 },
      { x: 12, y: 0 },
    ]);
  });

  it("arredonda para cima para não deixar buraco no traço", () => {
    expect(getStrokePoints({ x: 0, y: 0 }, { x: 0, y: 10 }, 4)).toHaveLength(3);
  });
});
