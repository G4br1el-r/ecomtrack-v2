export function getVariation(current: number, previous: number): number | null {
  if (previous === 0) return null;
  return (current - previous) / previous;
}
