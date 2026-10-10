import { describe, expect, it, vi } from "vitest";

import { getPathPointAt } from "./get-path-point-at";

const TOTAL_LENGTH = 200;
const FALLBACK = { x: 1, y: 2 };

function fakePath() {
  const getPointAtLength = vi.fn((length: number) => ({ x: length, y: length / 2 }));
  const path = { getTotalLength: () => TOTAL_LENGTH, getPointAtLength } as unknown as SVGPathElement;
  return { path, getPointAtLength };
}

describe("getPathPointAt", () => {
  it("devolve o ponto na fração do comprimento do caminho", () => {
    const { path, getPointAtLength } = fakePath();
    expect(getPathPointAt(path, 0.25, FALLBACK)).toEqual({ x: 50, y: 25 });
    expect(getPointAtLength).toHaveBeenCalledWith(50);
  });

  it("usa o ponto reserva enquanto o caminho não existe", () => {
    expect(getPathPointAt(null, 0.5, FALLBACK)).toBe(FALLBACK);
  });
});
