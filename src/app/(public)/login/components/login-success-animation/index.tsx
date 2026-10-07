"use client";

import { motion } from "motion/react";
import {
  CODE_CIRCLE_SLOT_SCALE,
  LOGIN_SUCCESS_CHECK_DELAY_SECONDS,
  LOGIN_SUCCESS_CHECK_DRAW_SECONDS,
  LOGIN_SUCCESS_CHECK_PATH,
  LOGIN_SUCCESS_CHECK_STROKE_WIDTH,
  LOGIN_SUCCESS_CIRCLE_AT,
  LOGIN_SUCCESS_DIGITS_FADE_AT,
  LOGIN_SUCCESS_HOLD_MS,
  LOGIN_SUCCESS_SLOTS_DURATION_SECONDS,
  LOGIN_SUCCESS_SPIN_DEGREES,
  LOGIN_SUCCESS_SPIN_END_AT,
} from "@/constants/Modules/Core/Auth/login-success";
import { CODE_SLOT_HALF_SIZE_PX, CODE_SLOT_SIZE_PX } from "@/constants/Modules/Core/DesignSystem/code-input";
import { EASE_OUT, SPRING_SNAPPY } from "@/constants/Modules/Core/DesignSystem/motion";
import { getCodeSlotPositions } from "@/lib/Modules/Core/Auth/get-code-slot-positions";

const SLOTS_TIMES = [0, LOGIN_SUCCESS_CIRCLE_AT, LOGIN_SUCCESS_SPIN_END_AT, 1];
const DIGITS_TIMES = [0, LOGIN_SUCCESS_DIGITS_FADE_AT, 1];

export function LoginSuccessAnimation({ code, onComplete }: { code: string; onComplete: () => void }) {
  const digits = [...code];
  const positions = getCodeSlotPositions(digits.length);

  return (
    <div role="status" aria-label="Código confirmado. Entrando..." className="relative grid h-28 place-items-center">
      <motion.div
        className="absolute top-1/2 left-1/2"
        animate={{ rotate: [0, 0, LOGIN_SUCCESS_SPIN_DEGREES, LOGIN_SUCCESS_SPIN_DEGREES] }}
        transition={{ duration: LOGIN_SUCCESS_SLOTS_DURATION_SECONDS, times: SLOTS_TIMES, ease: "easeInOut" }}
      >
        {positions.map((position, index) => (
          <motion.span
            key={`slot-${position.rowX}`}
            aria-hidden="true"
            className="absolute grid place-items-center rounded-md border border-primary bg-primary/10 font-mono text-lg text-primary"
            style={{
              width: CODE_SLOT_SIZE_PX,
              height: CODE_SLOT_SIZE_PX,
              left: -CODE_SLOT_HALF_SIZE_PX,
              top: -CODE_SLOT_HALF_SIZE_PX,
            }}
            initial={{ x: position.rowX, y: 0 }}
            animate={{
              x: [position.rowX, position.circleX, position.circleX, 0],
              y: [0, position.circleY, position.circleY, 0],
              scale: [1, CODE_CIRCLE_SLOT_SCALE, CODE_CIRCLE_SLOT_SCALE, 0],
            }}
            transition={{ duration: LOGIN_SUCCESS_SLOTS_DURATION_SECONDS, times: SLOTS_TIMES, ease: "easeInOut" }}
          >
            <motion.span
              animate={{ opacity: [1, 0, 0] }}
              transition={{ duration: LOGIN_SUCCESS_SLOTS_DURATION_SECONDS, times: DIGITS_TIMES }}
            >
              {digits[index]}
            </motion.span>
          </motion.span>
        ))}
      </motion.div>
      <motion.span
        aria-hidden="true"
        className="grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-md"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ ...SPRING_SNAPPY, delay: LOGIN_SUCCESS_SLOTS_DURATION_SECONDS }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={LOGIN_SUCCESS_CHECK_STROKE_WIDTH}
          className="size-8"
        >
          <title>Confirmado</title>
          <motion.path
            d={LOGIN_SUCCESS_CHECK_PATH}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: LOGIN_SUCCESS_CHECK_DRAW_SECONDS,
              ease: EASE_OUT,
              delay: LOGIN_SUCCESS_CHECK_DELAY_SECONDS,
            }}
            onAnimationComplete={() => setTimeout(onComplete, LOGIN_SUCCESS_HOLD_MS)}
          />
        </svg>
      </motion.span>
    </div>
  );
}
