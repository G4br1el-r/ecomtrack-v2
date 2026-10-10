"use client";

import { motion } from "motion/react";

import { CODE_SUCCESS_SHIELD } from "@/constants/Modules/Core/Auth/code-feedback";
import { EASE_OUT, SPRING_SNAPPY } from "@/constants/Modules/Core/DesignSystem/motion";
import { getCodeSlotOffsets } from "@/lib/Modules/Core/Auth/get-code-slot-offsets";

import { CodeRow } from "../code-row";
import { CodeSlot } from "../code-slot";
import { LoginDrawnIcon } from "../login-drawn-icon";

export function LoginSuccessAnimation({ code, onComplete }: { code: string; onComplete: () => void }) {
  const digits = [...code];
  const offsets = getCodeSlotOffsets(digits.length);

  return (
    <div role="status" aria-label="Código confirmado. Entrando..." className="grid h-28 place-items-center">
      <CodeRow>
        {offsets.map((offset, index) => (
          <CodeSlot
            key={offset}
            digit={digits[index]}
            tone="success"
            animate={{ x: -offset, scale: 0, opacity: 0 }}
            transition={{
              delay: index * CODE_SUCCESS_SHIELD.staggerSeconds,
              duration: CODE_SUCCESS_SHIELD.durationSeconds,
              ease: EASE_OUT,
            }}
          />
        ))}
        <motion.span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-success text-success-foreground shadow-lg"
          initial={{ scale: 0, rotate: CODE_SUCCESS_SHIELD.iconTilt }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ ...SPRING_SNAPPY, delay: CODE_SUCCESS_SHIELD.iconDelaySeconds }}
          onAnimationComplete={() => setTimeout(onComplete, CODE_SUCCESS_SHIELD.holdMs)}
        >
          <LoginDrawnIcon name="code" delay={CODE_SUCCESS_SHIELD.iconDelaySeconds} className="size-9" />
        </motion.span>
      </CodeRow>
    </div>
  );
}
