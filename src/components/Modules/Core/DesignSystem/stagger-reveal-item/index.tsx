"use client";

import { motion, type Transition } from "motion/react";

import { SLIDE_OFFSET_Y, SPRING_SOFT } from "@/constants/Modules/Core/DesignSystem/motion";

export function StaggerRevealItem({
  children,
  className,
  transition = SPRING_SOFT,
}: {
  children: React.ReactNode;
  className?: string;
  transition?: Transition;
}) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: SLIDE_OFFSET_Y }, visible: { opacity: 1, y: 0 } }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
