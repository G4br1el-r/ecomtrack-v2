"use client";

import { useMotionValue, useReducedMotion } from "motion/react";

import { getPointerOffset } from "@/lib/Modules/Core/DesignSystem/get-pointer-offset";

export function usePointerOffset() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const handlePointerMove = (event: React.PointerEvent<Element>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(getPointerOffset(event.clientX, bounds.left, bounds.width));
    pointerY.set(getPointerOffset(event.clientY, bounds.top, bounds.height));
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return { pointerX, pointerY, reduceMotion, handlePointerMove, handlePointerLeave };
}
