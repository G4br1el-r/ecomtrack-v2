"use client";

import { motion } from "motion/react";
import type { Step } from "@/@types/Modules/Core/DesignSystem/step";
import { DURATION_SLOW, EASE_OUT } from "@/constants/Modules/Core/DesignSystem/motion";
import { cn } from "@/lib/utils";

import { StepIndicator } from "../step-indicator";

export function Stepper({ steps, current }: { steps: Step[]; current: number }) {
  return (
    <ol className="flex w-full items-start">
      {steps.map((step, index) => {
        const status = index < current ? "complete" : index === current ? "current" : "upcoming";
        const isLast = index === steps.length - 1;
        return (
          <li key={step.id} className={cn("relative flex flex-col gap-2", !isLast && "flex-1")}>
            <div className="flex items-center">
              <StepIndicator status={status} number={index + 1} />
              {isLast ? null : (
                <div className="relative mx-2 h-px flex-1 bg-border">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-primary"
                    initial={false}
                    animate={{ width: index < current ? "100%" : "0%" }}
                    transition={{ duration: DURATION_SLOW, ease: EASE_OUT }}
                  />
                </div>
              )}
            </div>
            <div className="pr-4">
              <p className={cn("text-sm font-medium", status === "upcoming" && "text-muted-foreground")}>
                {step.title}
              </p>
              {step.description ? <p className="text-xs text-muted-foreground">{step.description}</p> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
