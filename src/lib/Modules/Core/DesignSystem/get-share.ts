export function getShare(value: number, total: number): number {
  return total === 0 ? 0 : value / total;
}
