"use client";

import { motion, useReducedMotion } from "motion/react";

import type { BlueprintTimeline } from "@/@types/Modules/Core/Shell/under-construction";
import { LOOP_EASE } from "@/constants/Modules/Core/DesignSystem/motion";
import {
  CONSTRUCTION_CURSOR_LABEL_HEIGHT,
  CONSTRUCTION_CURSOR_LABEL_WIDTH,
  CONSTRUCTION_CURSOR_LABEL_X,
  CONSTRUCTION_CURSOR_LABEL_Y,
  CONSTRUCTION_CURSOR_PATH,
  CONSTRUCTION_CYCLE_SECONDS,
} from "@/constants/Modules/Core/Shell/under-construction";

export function BlueprintCursor({ cursor, label }: { cursor: BlueprintTimeline["cursor"]; label: string }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return null;
  return (
    <motion.g
      initial={false}
      animate={{ x: cursor.x, y: cursor.y }}
      transition={{
        duration: CONSTRUCTION_CYCLE_SECONDS,
        times: cursor.times,
        ease: LOOP_EASE,
        repeat: Number.POSITIVE_INFINITY,
      }}
    >
      <path
        d={CONSTRUCTION_CURSOR_PATH}
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="fill-primary stroke-background"
      />
      <foreignObject
        x={CONSTRUCTION_CURSOR_LABEL_X}
        y={CONSTRUCTION_CURSOR_LABEL_Y}
        width={CONSTRUCTION_CURSOR_LABEL_WIDTH}
        height={CONSTRUCTION_CURSOR_LABEL_HEIGHT}
        overflow="visible"
      >
        <div className="flex size-full items-start">
          <span className="max-w-full truncate rounded-full rounded-tl-sm bg-primary px-2 py-0.5 text-[11px] leading-4 font-medium text-primary-foreground shadow-xs">
            {label}
          </span>
        </div>
      </foreignObject>
    </motion.g>
  );
}
