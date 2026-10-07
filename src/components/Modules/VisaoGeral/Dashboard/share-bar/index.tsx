"use client";

import { motion } from "motion/react";

import { SPRING_SOFT } from "@/constants/Modules/Core/DesignSystem/motion";
import { PERCENT_SCALE } from "@/constants/Modules/Core/DesignSystem/number-format";
import { getShare } from "@/lib/Modules/Core/DesignSystem/get-share";
import { cn } from "@/lib/utils";

export function ShareBar({ value, max, className }: { value: number; max: number; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("h-1.5 overflow-hidden rounded-full bg-muted", className)}>
      <motion.div
        className="h-full rounded-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${getShare(value, max) * PERCENT_SCALE}%` }}
        transition={SPRING_SOFT}
      />
    </div>
  );
}
