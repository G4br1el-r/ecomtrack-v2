"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { ICON_ROTATION_DEGREES, SPRING_SNAPPY } from "@/constants/Modules/Core/DesignSystem/motion";
import { cn } from "@/lib/utils";

export function DataTableExpandButton({
  expanded,
  label,
  onToggle,
  showLabel = false,
  className,
}: {
  expanded: boolean;
  label: string;
  onToggle: () => void;
  showLabel?: boolean;
  className?: string;
}) {
  return (
    <Button
      variant="ghost"
      size={showLabel ? "sm" : "icon-sm"}
      aria-expanded={expanded}
      aria-label={showLabel ? undefined : label}
      onClick={onToggle}
      className={cn(showLabel && "text-muted-foreground hover:text-foreground", className)}
    >
      {showLabel ? label : null}
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
