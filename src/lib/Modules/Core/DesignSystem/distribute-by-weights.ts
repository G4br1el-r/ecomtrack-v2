export function distributeByWeights(total: number, weights: readonly number[]): number[] {
  const sum = weights.reduce((accumulated, weight) => accumulated + weight, 0);
  if (sum === 0) return weights.map(() => 0);
  return weights.map((weight) => (total * weight) / sum);
}
