export function getIntensityStep(value: number, max: number, steps: number): number {
  if (value <= 0 || max <= 0) return 0;
  return Math.min(steps - 1, Math.max(1, Math.ceil((value / max) * (steps - 1))));
}
