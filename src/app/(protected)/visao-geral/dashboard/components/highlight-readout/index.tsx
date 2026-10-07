"use client";

import { AnimatePresence, motion } from "motion/react";

import { ENTER_OFFSET_Y } from "@/constants/Modules/Core/DesignSystem/motion";

export function HighlightReadout({ id, title, value }: { id: string; title: string; value: string }) {
  return (
    <div className="h-11 overflow-hidden" aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={id}
          initial={{ opacity: 0, y: ENTER_OFFSET_Y }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -ENTER_OFFSET_Y }}
        >
          <p className="text-xs text-muted-foreground">{title}</p>
          <p className="text-lg font-semibold tracking-tight tabular-nums">{value}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
