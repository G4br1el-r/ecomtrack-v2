"use client";

import { type HTMLMotionProps, motion } from "motion/react";

import type { CodeFeedbackTone } from "@/@types/Modules/Core/Auth/code-feedback";
import { CODE_FEEDBACK_TEXT_CLASS, CODE_FEEDBACK_TONE_CLASS } from "@/constants/Modules/Core/Auth/code-feedback";
import { CODE_SLOT_SIZE_PX } from "@/constants/Modules/Core/DesignSystem/code-input";
import { DURATION_BASE } from "@/constants/Modules/Core/DesignSystem/motion";
import { cn } from "@/lib/utils";

export function CodeSlot({
  digit,
  tone,
  digitProps,
  className,
  style,
  ...props
}: Omit<HTMLMotionProps<"span">, "children"> & {
  digit: string;
  tone: CodeFeedbackTone;
  digitProps?: HTMLMotionProps<"span">;
}) {
  return (
    <motion.span
      className={cn(
        "relative grid place-items-center rounded-md border border-input bg-background font-mono text-lg",
        className,
      )}
      style={{ width: CODE_SLOT_SIZE_PX, height: CODE_SLOT_SIZE_PX, ...style }}
      {...props}
    >
      <motion.span
        aria-hidden="true"
        className={cn("absolute -inset-px rounded-md border", CODE_FEEDBACK_TONE_CLASS[tone])}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION_BASE }}
      />
      <motion.span className={cn("relative", CODE_FEEDBACK_TEXT_CLASS[tone])} {...digitProps}>
        {digit}
      </motion.span>
    </motion.span>
  );
}
