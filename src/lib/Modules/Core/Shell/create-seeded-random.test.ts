import { describe, expect, it } from "vitest";

import { createSeededRandom } from "./create-seeded-random";

const SAMPLE_SIZE = 50;

describe("createSeededRandom", () => {
  it("gera a mesma sequência para a mesma semente", () => {
    const first = createSeededRandom(42);
    const second = createSeededRandom(42);
    expect(Array.from({ length: SAMPLE_SIZE }, first)).toEqual(Array.from({ length: SAMPLE_SIZE }, second));
  });

  it("gera sequências diferentes para sementes diferentes", () => {
    expect(createSeededRandom(1)()).not.toBe(createSeededRandom(2)());
  });

  it("gera valores entre 0 e 1", () => {
    const random = createSeededRandom(7);
    for (const value of Array.from({ length: SAMPLE_SIZE }, random)) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});
