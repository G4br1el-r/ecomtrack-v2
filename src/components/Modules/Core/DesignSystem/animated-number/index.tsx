"use client";

import { motion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

import type { NumberFormatKind } from "@/@types/Modules/Core/DesignSystem/number-format";
import { SPRING_NUMBER } from "@/constants/Modules/Core/DesignSystem/motion";
import { formatNumber } from "@/lib/Modules/Core/DesignSystem/format-number";
import { cn } from "@/lib/utils";

export function AnimatedNumber({
  value,
  kind = "integer",
  className,
}: {
  value: number;
  kind?: NumberFormatKind;
  className?: string;
}) {
  const spring = useSpring(0, SPRING_NUMBER);
  const display = useTransform(spring, (current) => formatNumber(current, kind));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span className={cn("tabular-nums", className)} aria-label={formatNumber(value, kind)}>
      {display}
    </motion.span>
  );
}
