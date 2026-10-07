import { describe, expect, it } from "vitest";

import { getIntensityStep } from "./get-intensity-step";

const STEPS = 5;

describe("getIntensityStep", () => {
  it("usa o primeiro degrau para zero", () => {
    expect(getIntensityStep(0, 100, STEPS)).toBe(0);
    expect(getIntensityStep(10, 0, STEPS)).toBe(0);
  });

  it("garante degrau visível para qualquer valor positivo", () => {
    expect(getIntensityStep(1, 1000, STEPS)).toBe(1);
  });

  it("usa o último degrau para o máximo", () => {
    expect(getIntensityStep(100, 100, STEPS)).toBe(STEPS - 1);
  });

  it("distribui os valores intermediários", () => {
    expect(getIntensityStep(50, 100, STEPS)).toBe(2);
    expect(getIntensityStep(70, 100, STEPS)).toBe(3);
  });
});
