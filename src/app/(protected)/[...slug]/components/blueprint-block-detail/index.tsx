"use client";

import { motion, useReducedMotion } from "motion/react";

import type { BlueprintStep } from "@/@types/Modules/Core/Shell/under-construction";
import { LOOP_EASE } from "@/constants/Modules/Core/DesignSystem/motion";
import {
  CONSTRUCTION_BLOCK_PADDING,
  CONSTRUCTION_CHART_PATH,
  CONSTRUCTION_CYCLE_SECONDS,
  CONSTRUCTION_TABLE_ROWS,
} from "@/constants/Modules/Core/Shell/under-construction";

export function BlueprintBlockDetail({ step }: { step: BlueprintStep }) {
  const reduceMotion = useReducedMotion();
  if (step.kind === "kpi") {
    return (
      <>
        <rect x="10" y="12" width="40" height="6" rx="3" className="fill-muted-foreground/25" />
        <rect x="10" y="28" width="62" height="12" rx="4" className="fill-primary/35" />
      </>
    );
  }
  if (step.kind === "table") {
    return (
      <>
        {CONSTRUCTION_TABLE_ROWS.map((row) => (
          <line
            key={row.id}
            x1={CONSTRUCTION_BLOCK_PADDING}
            x2={step.width - CONSTRUCTION_BLOCK_PADDING}
            y1={row.y}
            y2={row.y}
            className="stroke-border"
          />
        ))}
      </>
    );
  }
  if (step.kind === "chart") {
    return (
      <motion.path
        d={CONSTRUCTION_CHART_PATH}
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="stroke-primary"
        initial={false}
        animate={reduceMotion ? { pathLength: 1 } : { pathLength: [0, 0, 1, 1] }}
        transition={{
          duration: CONSTRUCTION_CYCLE_SECONDS,
          times: step.drawTimes,
          ease: LOOP_EASE,
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    );
  }
  return null;
}
