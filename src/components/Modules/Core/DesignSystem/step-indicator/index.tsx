"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";

import type { StepStatus } from "@/@types/Modules/Core/DesignSystem/step";
import { SPRING_SNAPPY } from "@/constants/Modules/Core/DesignSystem/motion";
import { cn } from "@/lib/utils";

export function StepIndicator({ status, number }: { status: StepStatus; number: number }) {
  return (
    <motion.span
      layout
      transition={SPRING_SNAPPY}
      className={cn(
        "relative z-10 grid size-7 shrink-0 place-items-center rounded-full border text-xs font-medium tabular-nums transition-colors",
        status === "complete" && "border-primary bg-primary text-primary-foreground",
        status === "current" && "border-primary bg-background text-primary ring-4 ring-primary/15",
        status === "upcoming" && "bg-background text-muted-foreground",
      )}
    >
      {status === "complete" ? <Check className="size-3.5" aria-hidden="true" /> : number}
    </motion.span>
  );
}
