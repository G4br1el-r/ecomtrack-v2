"use client";

import { MotionConfig } from "motion/react";

import { DURATION_BASE, EASE_OUT } from "@/constants/Modules/Core/DesignSystem/motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: DURATION_BASE, ease: EASE_OUT }}>
      {children}
    </MotionConfig>
  );
}
