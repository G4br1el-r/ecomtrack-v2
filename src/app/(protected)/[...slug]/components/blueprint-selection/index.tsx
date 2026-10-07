"use client";

import { motion } from "motion/react";

import type { BlueprintStep } from "@/@types/Modules/Core/Shell/under-construction";
import { LOOP_EASE } from "@/constants/Modules/Core/DesignSystem/motion";
import {
  CONSTRUCTION_CYCLE_SECONDS,
  CONSTRUCTION_SELECTION_HANDLE_SIZE,
  CONSTRUCTION_SELECTION_INSET,
} from "@/constants/Modules/Core/Shell/under-construction";

const HANDLE_CENTER_RATIO = 0.5;

export function BlueprintSelection({ step }: { step: BlueprintStep }) {
  const inset = CONSTRUCTION_SELECTION_INSET;
  const handle = CONSTRUCTION_SELECTION_HANDLE_SIZE;
  const left = -inset - handle * HANDLE_CENTER_RATIO;
  const top = -inset - handle * HANDLE_CENTER_RATIO;
  const right = step.width + inset - handle * HANDLE_CENTER_RATIO;
  const bottom = step.height + inset - handle * HANDLE_CENTER_RATIO;
  const corners = [
    { id: "top-left", x: left, y: top },
    { id: "top-right", x: right, y: top },
    { id: "bottom-left", x: left, y: bottom },
    { id: "bottom-right", x: right, y: bottom },
  ];
  return (
    <motion.g
      initial={false}
      animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
      transition={{
        duration: CONSTRUCTION_CYCLE_SECONDS,
        times: step.selectTimes,
        ease: LOOP_EASE,
        repeat: Number.POSITIVE_INFINITY,
      }}
    >
      <rect
        x={-inset}
        y={-inset}
        width={step.width + inset + inset}
        height={step.height + inset + inset}
        strokeWidth="1.5"
        className="stroke-primary"
      />
      {corners.map((corner) => (
        <rect
          key={corner.id}
          x={corner.x}
          y={corner.y}
          width={handle}
          height={handle}
          strokeWidth="1.5"
          className="fill-background stroke-primary"
        />
      ))}
    </motion.g>
  );
}
