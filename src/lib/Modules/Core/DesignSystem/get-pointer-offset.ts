import { getPointerRatio } from "./get-pointer-ratio";

const CENTER_RATIO = 0.5;

export function getPointerOffset(pointer: number, start: number, size: number): number {
  if (size <= 0) return 0;
  return getPointerRatio(pointer, start, size) - CENTER_RATIO;
}
