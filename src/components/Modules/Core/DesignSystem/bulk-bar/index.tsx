"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { SLIDE_OFFSET_Y, SPRING_SOFT } from "@/constants/Modules/Core/DesignSystem/motion";

export function BulkBar({
  count,
  onClear,
  children,
}: {
  count: number;
  onClear: () => void;
  children?: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {count > 0 ? (
        <motion.div
          role="toolbar"
          aria-label="Ações em massa"
          initial={{ opacity: 0, y: SLIDE_OFFSET_Y }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: SLIDE_OFFSET_Y }}
          transition={SPRING_SOFT}
          className="fixed inset-x-0 bottom-6 z-40 mx-auto flex w-fit max-w-[calc(100vw-2rem)] items-center gap-2 rounded-xl border bg-popover p-1.5 pl-4 text-popover-foreground shadow-overlay"
        >
          <span className="text-sm font-medium tabular-nums">{count} selecionado(s)</span>
          <span aria-hidden="true" className="mx-1 h-5 w-px bg-border" />
          {children}
          <Button variant="ghost" size="icon-sm" aria-label="Limpar seleção" onClick={onClear}>
            <X aria-hidden="true" />
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
