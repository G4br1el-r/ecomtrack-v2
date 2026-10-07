const MULBERRY_INCREMENT = 0x6d2b79f5;
const MULBERRY_SHIFT_A = 15;
const MULBERRY_SHIFT_B = 7;
const MULBERRY_SHIFT_C = 14;
const MULBERRY_MULTIPLIER = 61;
const UINT32_RANGE = 4294967296;

export function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + MULBERRY_INCREMENT) >>> 0;
    let value = Math.imul(state ^ (state >>> MULBERRY_SHIFT_A), state | 1);
    value ^= value + Math.imul(value ^ (value >>> MULBERRY_SHIFT_B), value | MULBERRY_MULTIPLIER);
    return ((value ^ (value >>> MULBERRY_SHIFT_C)) >>> 0) / UINT32_RANGE;
  };
}
