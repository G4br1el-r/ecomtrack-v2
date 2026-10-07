import { describe, expect, it } from "vitest";

import { getPointerOffset } from "./get-pointer-offset";

describe("getPointerOffset", () => {
  it("retorna zero no centro do elemento", () => {
    expect(getPointerOffset(150, 100, 100)).toBe(0);
  });

  it("vai de -0.5 na borda inicial a 0.5 na borda final", () => {
    expect(getPointerOffset(100, 100, 100)).toBe(-0.5);
    expect(getPointerOffset(200, 100, 100)).toBe(0.5);
  });

  it("retorna zero quando o elemento não tem tamanho", () => {
    expect(getPointerOffset(50, 0, 0)).toBe(0);
  });
});
