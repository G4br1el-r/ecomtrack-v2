"use client";

import { CircleX } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";
import { useState } from "react";

import type { NotFoundVariant } from "@/@types/Modules/Core/Shell/not-found";
import { Badge } from "@/components/ui/badge";
import { DURATION_SLOW, EASE_OUT, POP_SCALE, SPRING_SNAPPY } from "@/constants/Modules/Core/DesignSystem/motion";
import { PERCENT_SCALE } from "@/constants/Modules/Core/DesignSystem/number-format";
import { APP_NAME } from "@/constants/Modules/Core/Shell/navigation";
import {
  GIFT_CARD_DROP_Y,
  GIFT_CARD_GLARE_REST,
  GIFT_CARD_HIGHLIGHT_DIGIT,
  GIFT_CARD_INSTRUCTION,
  GIFT_CARD_LABEL,
  GIFT_CARD_PIN_LABEL,
  GIFT_CARD_PIVOT,
  GIFT_CARD_REVEAL_LABEL,
  GIFT_CARD_SERIAL,
  GIFT_CARD_SUBTITLE,
  GIFT_CARD_SWING_DELAY_SECONDS,
  GIFT_CARD_SWING_FROM_DEGREES,
  GIFT_CARD_SWING_SPRING,
  GIFT_CARD_VALUE_CENTS,
  GIFT_CARD_VALUE_LABEL,
  GIFT_CARD_VALUE_PREFIX,
  NOT_FOUND_INVALID_LABELS,
  NOT_FOUND_PINS,
  NOT_FOUND_STATUS_CODES,
  SCRATCH_SHAKE_X,
} from "@/constants/Modules/Core/Shell/not-found";
import { getPointerRatio } from "@/lib/Modules/Core/DesignSystem/get-pointer-ratio";
import { cn } from "@/lib/utils";

import { ScratchCover } from "../scratch-cover";

export function NotFoundGiftCard({ variant }: { variant: NotFoundVariant }) {
  const reduceMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const code = NOT_FOUND_STATUS_CODES[variant];
  const [codeHead, codeTail] = code.split(GIFT_CARD_HIGHLIGHT_DIGIT);
  const glareX = useMotionValue<number>(GIFT_CARD_GLARE_REST.x);
  const glareY = useMotionValue<number>(GIFT_CARD_GLARE_REST.y);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.16), transparent 60%)`;

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    glareX.set(getPointerRatio(event.clientX, bounds.left, bounds.width) * PERCENT_SCALE);
    glareY.set(getPointerRatio(event.clientY, bounds.top, bounds.height) * PERCENT_SCALE);
  };

  return (
    <div className="relative pt-2">
      <span
        aria-hidden="true"
        className="absolute top-[1.45rem] left-1/2 z-10 h-2.5 w-24 -translate-x-1/2 rounded-full bg-linear-to-b from-zinc-200 via-zinc-400 to-zinc-500 shadow-md ring-1 ring-black/10"
      />
      <motion.div
        className="relative aspect-[5/8] w-60 overflow-hidden rounded-2xl bg-foreground text-background shadow-overlay ring-1 ring-white/10 ring-inset"
        style={{ transformOrigin: GIFT_CARD_PIVOT }}
        initial={reduceMotion ? false : { rotate: GIFT_CARD_SWING_FROM_DEGREES, y: GIFT_CARD_DROP_Y }}
        animate={{ rotate: 0, y: 0 }}
        transition={{ ...GIFT_CARD_SWING_SPRING, delay: GIFT_CARD_SWING_DELAY_SECONDS }}
        onPointerMove={handlePointerMove}
      >
        <span
          aria-hidden="true"
          className="absolute top-3.5 left-1/2 h-3 w-14 -translate-x-1/2 rounded-full bg-background shadow-[inset_0_1px_3px_rgb(0_0_0/0.5)]"
        />
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: glare }}
        />
        <div className="relative flex h-full flex-col px-5 pt-10 pb-4 text-left">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-semibold tracking-tight">
              <span className="size-3 rounded-[3px] bg-primary" />
              {APP_NAME}
            </span>
            <span className="text-[0.55rem] font-medium tracking-[0.2em] uppercase opacity-60">{GIFT_CARD_LABEL}</span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="text-7xl leading-none font-extrabold tracking-tighter">
              {codeHead}
              <span className="text-primary">{GIFT_CARD_HIGHLIGHT_DIGIT}</span>
              {codeTail}
            </p>
            <p className="mt-2 text-[0.6rem] tracking-[0.2em] uppercase opacity-60">{GIFT_CARD_SUBTITLE}</p>
          </div>
          <div className="mb-3 flex items-end justify-between">
            <span className="text-[0.6rem] tracking-wider uppercase opacity-60">{GIFT_CARD_VALUE_LABEL}</span>
            <span className="text-lg font-semibold tabular-nums">{`${GIFT_CARD_VALUE_PREFIX} ${code}${GIFT_CARD_VALUE_CENTS}`}</span>
          </div>
          <div className="mb-1.5 flex h-5 items-center justify-between">
            <span className="text-[0.6rem] tracking-wider whitespace-nowrap uppercase opacity-60">
              {GIFT_CARD_PIN_LABEL}
            </span>
            {revealed ? (
              <motion.span
                initial={{ opacity: 0, scale: POP_SCALE }}
                animate={{ opacity: 1, scale: 1, x: SCRATCH_SHAKE_X }}
                transition={{ ...SPRING_SNAPPY, x: { duration: DURATION_SLOW, ease: EASE_OUT } }}
              >
                <Badge className="h-4.5 bg-background px-1.5 text-[0.6rem] text-destructive">
                  <CircleX aria-hidden="true" />
                  {NOT_FOUND_INVALID_LABELS[variant]}
                </Badge>
              </motion.span>
            ) : null}
          </div>
          <div className="relative h-9 overflow-hidden rounded-md bg-background">
            <span
              className={cn(
                "grid size-full place-items-center font-mono text-[0.7rem] font-semibold tracking-wider text-foreground transition-colors",
                revealed && "text-destructive line-through decoration-2",
              )}
            >
              {NOT_FOUND_PINS[variant]}
            </span>
            <ScratchCover label={GIFT_CARD_REVEAL_LABEL} revealed={revealed} onReveal={() => setRevealed(true)} />
          </div>
          <p className={cn("mt-1.5 text-center text-[0.55rem] opacity-50 transition-opacity", revealed && "opacity-0")}>
            {GIFT_CARD_INSTRUCTION}
          </p>
          <div className="mt-3 flex items-end justify-between opacity-60">
            <span
              aria-hidden="true"
              className="h-5 w-24 bg-[repeating-linear-gradient(90deg,currentColor_0_1px,transparent_1px_3px,currentColor_3px_5px,transparent_5px_6px,currentColor_6px_7px,transparent_7px_10px)]"
            />
            <span className="font-mono text-[0.55rem] tracking-wider">{GIFT_CARD_SERIAL}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
