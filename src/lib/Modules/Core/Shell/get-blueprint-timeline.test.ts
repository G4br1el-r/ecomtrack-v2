import { describe, expect, it } from "vitest";

import type { BlueprintBlock } from "@/@types/Modules/Core/Shell/under-construction";

import { getBlueprintTimeline } from "./get-blueprint-timeline";

const BLOCKS: BlueprintBlock[] = [
  { id: "a", kind: "text", x: 0, y: 0, width: 20, height: 10 },
  { id: "b", kind: "kpi", x: 40, y: 20, width: 40, height: 20 },
];

const OPTIONS = {
  blocks: BLOCKS,
  buildStart: 0.1,
  buildStep: 0.2,
  fade: 0.05,
  draw: 0.1,
  holdEnd: 0.9,
  cursorRest: { x: 100, y: 100 },
  cursorAnchor: { x: 0.5, y: 0.5 },
};

describe("getBlueprintTimeline", () => {
  it("monta cada bloco em sequência e mantém até o fim do ciclo", () => {
    const { steps } = getBlueprintTimeline(OPTIONS);
    expect(steps[0].times[1]).toBe(0.1);
    expect(steps[0].times.slice(3)).toEqual([0.85, 0.9, 1]);
    expect(steps[1].times[1]).toBeCloseTo(0.3);
    expect(steps[1].drawTimes[2]).toBeCloseTo(0.45);
  });

  it("seleciona o bloco enquanto o cursor está sobre ele", () => {
    const { steps } = getBlueprintTimeline(OPTIONS);
    expect(steps[0].selectTimes[1]).toBe(0.1);
    expect(steps[0].selectTimes[4]).toBeCloseTo(0.3);
  });

  it("leva o cursor ao centro de cada bloco e devolve ao repouso", () => {
    const { cursor } = getBlueprintTimeline(OPTIONS);
    expect(cursor.x).toEqual([100, 10, 60, 100, 100]);
    expect(cursor.y).toEqual([100, 5, 30, 100, 100]);
    expect(cursor.times[0]).toBe(0);
    expect(cursor.times.at(-2)).toBe(0.9);
  });

  it("posiciona o cursor no ponto de ancoragem do bloco", () => {
    const { cursor } = getBlueprintTimeline({ ...OPTIONS, cursorAnchor: { x: 0.25, y: 0 } });
    expect(cursor.x).toEqual([100, 5, 50, 100, 100]);
    expect(cursor.y).toEqual([100, 0, 20, 100, 100]);
  });

  it("aceita lista vazia sem quebrar", () => {
    const { steps, cursor } = getBlueprintTimeline({ ...OPTIONS, blocks: [] });
    expect(steps).toEqual([]);
    expect(cursor.x).toEqual([100, 100, 100]);
  });
});
