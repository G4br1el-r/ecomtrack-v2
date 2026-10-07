export function resolvePageSize(stored: number | undefined, options: readonly number[]): number {
  const [first] = options;
  return stored !== undefined && options.includes(stored) ? stored : first;
}
