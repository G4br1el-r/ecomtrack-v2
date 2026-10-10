import { describe, expect, it } from "vitest";

import { buildWaveTilePath } from "./build-wave-tile-path";

const LAYER = { wavelength: 60, base: 40, amplitude: 15 };
const THICKNESS = 100;

describe("buildWaveTilePath", () => {
  it("desenha uma onda completa na horizontal, preenchendo até a base do quadro", () => {
    expect(buildWaveTilePath(LAYER, THICKNESS, "horizontal")).toBe(
      "M0 100 L0 40 C10 20 20 20 30 40 C40 60 50 60 60 40 L60 100 Z",
    );
  });

  it("troca os eixos na vertical, preenchendo até a borda direita", () => {
    expect(buildWaveTilePath(LAYER, THICKNESS, "vertical")).toBe(
      "M100 0 L40 0 C20 10 20 20 40 30 C60 40 60 50 40 60 L100 60 Z",
    );
  });

  it("começa e termina na mesma altura para os ladrilhos se encaixarem", () => {
    const path = buildWaveTilePath(LAYER, THICKNESS, "horizontal");
    expect(path).toContain(`L0 ${LAYER.base}`);
    expect(path).toContain(`${LAYER.wavelength} ${LAYER.base} L`);
  });
});
