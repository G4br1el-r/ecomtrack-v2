export function getPointerRatio(pointer: number, start: number, size: number): number {
  if (size <= 0) return 0;
  return Math.min(Math.max((pointer - start) / size, 0), 1);
}
