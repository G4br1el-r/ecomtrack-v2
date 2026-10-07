"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { ICON_ROTATION_DEGREES, SPRING_SNAPPY } from "@/constants/Modules/Core/DesignSystem/motion";

export function DataTableExpandButton({
  expanded,
  label,
  onToggle,
}: {
  expanded: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <Button variant="ghost" size="icon-sm" aria-expanded={expanded} aria-label={label} onClick={onToggle}>
      <motion.span
        animate={{ rotate: expanded ? ICON_ROTATION_DEGREES : 0 }}
        transition={SPRING_SNAPPY}
        className="grid place-items-center"
      >
        <ChevronRight aria-hidden="true" />
      </motion.span>
    </Button>
  );
}
