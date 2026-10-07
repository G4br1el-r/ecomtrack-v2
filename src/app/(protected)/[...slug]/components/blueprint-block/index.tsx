"use client";

import { motion, useReducedMotion } from "motion/react";

import type { BlueprintStep } from "@/@types/Modules/Core/Shell/under-construction";
import { LOOP_EASE } from "@/constants/Modules/Core/DesignSystem/motion";
import {
  CONSTRUCTION_BLOCK_HIDDEN_SCALE_X,
  CONSTRUCTION_CYCLE_SECONDS,
} from "@/constants/Modules/Core/Shell/under-construction";
import { cn } from "@/lib/utils";

import { BlueprintBlockDetail } from "../blueprint-block-detail";
import { BlueprintSelection } from "../blueprint-selection";

export function BlueprintBlock({ step }: { step: BlueprintStep }) {
  const reduceMotion = useReducedMotion();
  const hidden = CONSTRUCTION_BLOCK_HIDDEN_SCALE_X;
  return (
    <g transform={`translate(${step.x} ${step.y})`}>
      <rect
        width={step.width}
        height={step.height}
        rx="6"
        fill="none"
        strokeDasharray="4 4"
        className="stroke-primary/40"
      />
      <motion.g
        style={{ originX: 0 }}
        initial={false}
        animate={
          reduceMotion
            ? { opacity: 1, scaleX: 1 }
            : { opacity: [0, 0, 1, 1, 0, 0], scaleX: [hidden, hidden, 1, 1, 1, hidden] }
        }
        transition={{
          duration: CONSTRUCTION_CYCLE_SECONDS,
          times: step.times,
          ease: LOOP_EASE,
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        <rect
          width={step.width}
          height={step.height}
          rx="6"
          className={cn(step.kind === "button" ? "fill-primary" : "fill-card stroke-border")}
        />
        {step.kind === "text" ? (
          <rect width={step.width} height={step.height} rx="6" className="fill-foreground/15" />
        ) : null}
        <BlueprintBlockDetail step={step} />
      </motion.g>
      {reduceMotion ? null : <BlueprintSelection step={step} />}
    </g>
  );
}
