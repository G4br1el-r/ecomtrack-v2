import { describe, expect, it } from "vitest";

import { getClearedRatio } from "./get-cleared-ratio";

function pixels(alphas: number[]) {
  return new Uint8ClampedArray(alphas.flatMap((alpha) => [0, 0, 0, alpha]));
}

describe("getClearedRatio", () => {
  it("retorna zero quando nada foi raspado", () => {
    expect(getClearedRatio(pixels([255, 255, 255, 255]), 1)).toBe(0);
  });

  it("calcula a fração de pixels transparentes", () => {
    expect(getClearedRatio(pixels([0, 255, 0, 255]), 1)).toBe(0.5);
  });

  it("amostra um pixel a cada passo", () => {
    expect(getClearedRatio(pixels([0, 255, 255, 255]), 2)).toBe(0.5);
  });

  it("retorna zero para imagem vazia", () => {
    expect(getClearedRatio(new Uint8ClampedArray(), 1)).toBe(0);
  });
});
