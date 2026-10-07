"use client";

import { X } from "lucide-react";
import { motion } from "motion/react";

import { badgeVariants } from "@/components/ui/badge";
import { POP_SCALE, SPRING_SNAPPY } from "@/constants/Modules/Core/DesignSystem/motion";
import { cn } from "@/lib/utils";

export function FilterChip({ field, label, onRemove }: { field?: string; label: string; onRemove?: () => void }) {
  const fullLabel = field ? `${field}: ${label}` : label;
  return (
    <motion.span
      layout
      initial={{ opacity: 0, scale: POP_SCALE }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: POP_SCALE }}
      transition={SPRING_SNAPPY}
      className={cn(badgeVariants({ variant: "secondary" }), "h-6 gap-1 px-2", onRemove && "pr-0.5")}
    >
      {field ? <span className="font-normal text-muted-foreground">{field}:</span> : null}
      {label}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remover filtro ${fullLabel}`}
          className="grid size-5 place-items-center rounded-sm text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
        >
          <X className="size-3" aria-hidden="true" />
        </button>
      ) : null}
    </motion.span>
  );
}
