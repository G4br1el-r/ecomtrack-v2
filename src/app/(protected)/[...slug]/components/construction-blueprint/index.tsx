import {
  CONSTRUCTION_BLUEPRINT_BLOCKS,
  CONSTRUCTION_BLUEPRINT_VIEWBOX,
  CONSTRUCTION_BUILD_START,
  CONSTRUCTION_BUILD_STEP,
  CONSTRUCTION_CURSOR_ANCHOR,
  CONSTRUCTION_CURSOR_REST,
  CONSTRUCTION_DRAW,
  CONSTRUCTION_FADE,
  CONSTRUCTION_HOLD_END,
  CONSTRUCTION_SIDEBAR_BARS,
} from "@/constants/Modules/Core/Shell/under-construction";
import { getBlueprintTimeline } from "@/lib/Modules/Core/Shell/get-blueprint-timeline";

import { BlueprintBlock } from "../blueprint-block";
import { BlueprintCursor } from "../blueprint-cursor";

const TIMELINE = getBlueprintTimeline({
  blocks: CONSTRUCTION_BLUEPRINT_BLOCKS,
  buildStart: CONSTRUCTION_BUILD_START,
  buildStep: CONSTRUCTION_BUILD_STEP,
  fade: CONSTRUCTION_FADE,
  draw: CONSTRUCTION_DRAW,
  holdEnd: CONSTRUCTION_HOLD_END,
  cursorRest: CONSTRUCTION_CURSOR_REST,
  cursorAnchor: CONSTRUCTION_CURSOR_ANCHOR,
});

export function ConstructionBlueprint({ label }: { label: string }) {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border bg-card shadow-overlay">
        <svg viewBox={CONSTRUCTION_BLUEPRINT_VIEWBOX} fill="none" aria-hidden="true" className="block h-auto w-full">
          <rect width="480" height="28" className="fill-muted/60" />
          <line x1="0" x2="480" y1="28" y2="28" className="stroke-border" />
          <circle cx="16" cy="14" r="4" className="fill-destructive/60" />
          <circle cx="29" cy="14" r="4" className="fill-warning/60" />
          <circle cx="42" cy="14" r="4" className="fill-success/60" />
          <rect x="180" y="8" width="120" height="12" rx="6" className="fill-border/70" />
          <line x1="100" x2="100" y1="28" y2="300" className="stroke-border" />
          <rect x="16" y="46" width="60" height="12" rx="4" className="fill-primary/40" />
          {CONSTRUCTION_SIDEBAR_BARS.map((bar) => (
            <rect key={bar.id} x="16" y={bar.y} width={bar.width} height="8" rx="4" className="fill-muted" />
          ))}
          {TIMELINE.steps.map((step) => (
            <BlueprintBlock key={step.id} step={step} />
          ))}
        </svg>
      </div>
      <svg
        viewBox={CONSTRUCTION_BLUEPRINT_VIEWBOX}
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full overflow-visible"
      >
        <BlueprintCursor cursor={TIMELINE.cursor} label={label} />
      </svg>
    </div>
  );
}
