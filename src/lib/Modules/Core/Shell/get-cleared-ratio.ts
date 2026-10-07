const CHANNELS_PER_PIXEL = 4;
const ALPHA_OFFSET = 3;

export function getClearedRatio(data: Uint8ClampedArray, stride: number): number {
  const step = Math.max(1, Math.floor(stride)) * CHANNELS_PER_PIXEL;
  let sampled = 0;
  let cleared = 0;
  for (let index = ALPHA_OFFSET; index < data.length; index += step) {
    sampled += 1;
    if (data[index] === 0) cleared += 1;
  }
  return sampled === 0 ? 0 : cleared / sampled;
}
