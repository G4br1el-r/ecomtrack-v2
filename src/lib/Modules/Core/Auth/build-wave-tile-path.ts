import type { EdgeOrientation, WaveLayer } from "@/@types/Modules/Core/Auth/login";

const SINE_CONTROL_FACTOR = 4 / 3;
const SEGMENTS_PER_WAVE = 6;

export function buildWaveTilePath(
  layer: Pick<WaveLayer, "wavelength" | "base" | "amplitude">,
  thickness: number,
  orientation: EdgeOrientation,
): string {
  const step = layer.wavelength / SEGMENTS_PER_WAVE;
  const crest = layer.base - layer.amplitude * SINE_CONTROL_FACTOR;
  const trough = layer.base + layer.amplitude * SINE_CONTROL_FACTOR;
  const point = (along: number, across: number) =>
    orientation === "vertical" ? `${across} ${along}` : `${along} ${across}`;
  return [
    `M${point(0, thickness)}`,
    `L${point(0, layer.base)}`,
    `C${point(step, crest)} ${point(step * 2, crest)} ${point(step * 3, layer.base)}`,
    `C${point(step * 4, trough)} ${point(step * 5, trough)} ${point(layer.wavelength, layer.base)}`,
    `L${point(layer.wavelength, thickness)}`,
    "Z",
  ].join(" ");
}
