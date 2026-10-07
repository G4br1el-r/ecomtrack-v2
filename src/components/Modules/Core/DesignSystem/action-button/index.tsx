"use client";

import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import type { ActionState } from "@/@types/Modules/Core/DesignSystem/action-state";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { DURATION_FAST, ENTER_OFFSET_Y } from "@/constants/Modules/Core/DesignSystem/motion";

export function ActionButton({
  state = "idle",
  loadingText,
  successText,
  disabled,
  children,
  ...props
}: React.ComponentProps<typeof Button> & { state?: ActionState; loadingText?: string; successText?: string }) {
  const busy = state !== "idle";
  return (
    <Button disabled={disabled || busy} aria-busy={state === "loading"} data-state={state} {...props}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={state}
          className="inline-flex items-center gap-1.5"
          initial={{ opacity: 0, y: ENTER_OFFSET_Y }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -ENTER_OFFSET_Y }}
          transition={{ duration: DURATION_FAST }}
        >
          {state === "loading" ? (
            <>
              <Spinner aria-hidden="true" />
              {loadingText ?? children}
            </>
          ) : null}
          {state === "success" ? (
            <>
              <Check className="size-4" aria-hidden="true" />
              {successText ?? children}
            </>
          ) : null}
          {state === "idle" ? children : null}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
