export function getLoopWindowTimes(start: number, end: number, fade: number): number[] {
  return [0, start, start + fade, end - fade, end, 1];
}
