import { describe, expect, it } from "vitest";

import { getPointerRatio } from "./get-pointer-ratio";

describe("getPointerRatio", () => {
  it("vai de 0 na borda inicial a 1 na borda final", () => {
    expect(getPointerRatio(100, 100, 200)).toBe(0);
    expect(getPointerRatio(200, 100, 200)).toBe(0.5);
    expect(getPointerRatio(300, 100, 200)).toBe(1);
  });

  it("limita ao intervalo quando o ponteiro sai do elemento", () => {
    expect(getPointerRatio(50, 100, 200)).toBe(0);
    expect(getPointerRatio(400, 100, 200)).toBe(1);
  });

  it("retorna zero quando o elemento não tem tamanho", () => {
    expect(getPointerRatio(50, 0, 0)).toBe(0);
  });
});
