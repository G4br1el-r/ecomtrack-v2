"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

import {
  FLOAT_DURATION_SECONDS,
  FLOAT_OFFSET_Y,
  LOOP_EASE,
  SPRING_NUMBER,
  TILT_FACTOR_DEGREES,
  TILT_PERSPECTIVE,
} from "@/constants/Modules/Core/DesignSystem/motion";
import { getPointerOffset } from "@/lib/Modules/Core/DesignSystem/get-pointer-offset";

export function StatusIllustration({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(
    useTransform(pointerX, (offset) => offset * TILT_FACTOR_DEGREES),
    SPRING_NUMBER,
  );
  const rotateX = useSpring(
    useTransform(pointerY, (offset) => -offset * TILT_FACTOR_DEGREES),
    SPRING_NUMBER,
  );
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(getPointerOffset(event.clientX, bounds.left, bounds.width));
    pointerY.set(getPointerOffset(event.clientY, bounds.top, bounds.height));
  };
  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };
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
