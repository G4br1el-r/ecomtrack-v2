import type { ScratchPoint } from "@/@types/Modules/Core/Shell/not-found";

export function getStrokePoints(from: ScratchPoint, to: ScratchPoint, step: number): ScratchPoint[] {
  const distance = Math.hypot(to.x - from.x, to.y - from.y);
  const count = Math.max(1, Math.ceil(distance / Math.max(step, Number.EPSILON)));
  return Array.from({ length: count }, (_, index) => {
    const progress = (index + 1) / count;
    return { x: from.x + (to.x - from.x) * progress, y: from.y + (to.y - from.y) * progress };
  });
}
