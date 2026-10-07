"use client";

import { Eye, EyeOff } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { POP_SCALE, SPRING_SNAPPY } from "@/constants/Modules/Core/DesignSystem/motion";

export function MotionPresenceDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <div className="w-full space-y-3">
      <div className="grid h-22 place-items-center rounded-lg border border-dashed">
        <AnimatePresence mode="popLayout">
          {visible ? (
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: POP_SCALE }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: POP_SCALE }}
              transition={SPRING_SNAPPY}
              className="rounded-lg border bg-card px-4 py-3 text-sm shadow-card"
            >
              Entra e sai com AnimatePresence
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <Button variant="outline" size="sm" onClick={() => setVisible((value) => !value)}>
        {visible ? (
          <EyeOff data-icon="inline-start" aria-hidden="true" />
        ) : (
          <Eye data-icon="inline-start" aria-hidden="true" />
        )}
        {visible ? "Esconder" : "Mostrar"}
      </Button>
    </div>
  );
}
