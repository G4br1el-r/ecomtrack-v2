"use client";

import { motion, useSpring, useTransform } from "motion/react";

import {
  FLOAT_DURATION_SECONDS,
  FLOAT_OFFSET_Y,
  LOOP_EASE,
  SPRING_NUMBER,
  TILT_FACTOR_DEGREES,
  TILT_PERSPECTIVE,
} from "@/constants/Modules/Core/DesignSystem/motion";
import { usePointerOffset } from "@/hooks/Modules/Core/DesignSystem/use-pointer-offset";

export function StatusIllustration({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  const { pointerX, pointerY, reduceMotion, handlePointerMove, handlePointerLeave } = usePointerOffset();
  const rotateY = useSpring(
    useTransform(pointerX, (offset) => offset * TILT_FACTOR_DEGREES),
    SPRING_NUMBER,
  );
  const rotateX = useSpring(
    useTransform(pointerY, (offset) => -offset * TILT_FACTOR_DEGREES),
    SPRING_NUMBER,
  );
  return (
    <motion.div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-lg"
      style={{ rotateX, rotateY, transformPerspective: TILT_PERSPECTIVE }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="absolute -inset-10 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative">{children}</div>
      <motion.div
        className="absolute -top-5 -left-5 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-overlay ring-4 ring-background [&>svg]:size-6"
        animate={reduceMotion ? undefined : { y: [0, -FLOAT_OFFSET_Y, 0] }}
        transition={{ duration: FLOAT_DURATION_SECONDS, ease: LOOP_EASE, repeat: Number.POSITIVE_INFINITY }}
      >
        {icon}
      </motion.div>
    </motion.div>
  );
}
