import type { BlueprintTimeline, BlueprintTimelineOptions } from "@/@types/Modules/Core/Shell/under-construction";

import { getLoopWindowTimes } from "./get-loop-window-times";

export function getBlueprintTimeline({
  blocks,
  buildStart,
  buildStep,
  fade,
  draw,
  holdEnd,
  cursorRest,
  cursorAnchor,
}: BlueprintTimelineOptions): BlueprintTimeline {
  const steps = blocks.map((block, index) => {
    const start = buildStart + index * buildStep;
    return {
      ...block,
      times: getLoopWindowTimes(start, holdEnd, fade),
      drawTimes: [0, start + fade, start + fade + draw, 1],
      selectTimes: getLoopWindowTimes(start, start + buildStep, fade),
    };
  });
  const starts = blocks.map((_, index) => buildStart + index * buildStep);
  return {
    steps,
    cursor: {
      x: [cursorRest.x, ...blocks.map((block) => block.x + block.width * cursorAnchor.x), cursorRest.x, cursorRest.x],
      y: [cursorRest.y, ...blocks.map((block) => block.y + block.height * cursorAnchor.y), cursorRest.y, cursorRest.y],
      times: [0, ...starts, holdEnd, 1],
    },
  };
}
