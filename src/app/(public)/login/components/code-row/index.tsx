"use client";

import { type HTMLMotionProps, motion } from "motion/react";

import { CODE_SLOT_GAP_PX } from "@/constants/Modules/Core/DesignSystem/code-input";
import { cn } from "@/lib/utils";

export function CodeRow({ className, style, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={cn("relative flex items-center justify-center", className)}
      style={{ gap: CODE_SLOT_GAP_PX, ...style }}
      {...props}
    />
  );
}
