import type { ScenePoint } from "@/@types/Modules/Core/Auth/login";

export function getPathPointAt(path: SVGPathElement | null, progress: number, fallback: ScenePoint): ScenePoint {
  if (!path) return fallback;
  const { x, y } = path.getPointAtLength(path.getTotalLength() * progress);
  return { x, y };
}
