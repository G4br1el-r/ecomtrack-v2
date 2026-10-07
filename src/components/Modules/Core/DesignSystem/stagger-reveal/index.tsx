"use client";

import { motion } from "motion/react";

import { REVEAL_STAGGER_SECONDS } from "@/constants/Modules/Core/DesignSystem/motion";

export function StaggerReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: REVEAL_STAGGER_SECONDS } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
