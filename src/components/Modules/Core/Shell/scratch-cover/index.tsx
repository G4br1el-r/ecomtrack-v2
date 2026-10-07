"use client";

import { Coins } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { ScratchPoint } from "@/@types/Modules/Core/Shell/not-found";
import { DURATION_SLOW, EASE_OUT, LOOP_EASE } from "@/constants/Modules/Core/DesignSystem/motion";
import {
  FULL_TURN_RADIANS,
  SCRATCH_BRUSH_RADIUS_PX,
  SCRATCH_CHECK_INTERVAL,
  SCRATCH_COIN_CURSOR,
  SCRATCH_COLOR_STOPS,
  SCRATCH_ERASE_MODE,
  SCRATCH_FONT_SIZE_PX,
  SCRATCH_FONT_WEIGHT,
  SCRATCH_HINT_DURATION_SECONDS,
  SCRATCH_HINT_REPEAT_DELAY_SECONDS,
  SCRATCH_HINT_ROTATE,
  SCRATCH_HINT_TRAVEL_X,
  SCRATCH_LETTER_SPACING,
  SCRATCH_MAX_PIXEL_RATIO,
  SCRATCH_NOISE_COLORS,
  SCRATCH_NOISE_DENSITY,
  SCRATCH_NOISE_SIZE_PX,
  SCRATCH_REVEAL_RATIO,
  SCRATCH_ROUGH_DISTANCE_RANGE,
  SCRATCH_ROUGH_MIN_DISTANCE,
  SCRATCH_ROUGH_RADIUS_RATIO,
  SCRATCH_ROUGH_STAMPS,
  SCRATCH_SAMPLE_STRIDE,
  SCRATCH_STROKE_STEP_PX,
  SCRATCH_TEXT,
  SCRATCH_TEXT_CENTER,
  SCRATCH_TEXT_COLOR,
} from "@/constants/Modules/Core/Shell/not-found";
import { getClearedRatio } from "@/lib/Modules/Core/Shell/get-cleared-ratio";
import { getStrokePoints } from "@/lib/Modules/Core/Shell/get-stroke-points";

export function ScratchCover({
  label,
  revealed,
  onReveal,
}: {
  label: string;
  revealed: boolean;
  onReveal: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPoint = useRef<ScratchPoint | null>(null);
  const scratching = useRef(false);
  const strokes = useRef(0);
  const [started, setStarted] = useState(false);

  const getContext = () => canvasRef.current?.getContext("2d", { willReadFrequently: true }) ?? null;

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !context) return;
    const ratio = Math.min(window.devicePixelRatio, SCRATCH_MAX_PIXEL_RATIO);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.globalCompositeOperation = "source-over";
    const gradient = context.createLinearGradient(0, 0, width, height);
    for (const stop of SCRATCH_COLOR_STOPS) gradient.addColorStop(stop.offset, stop.color);
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    const specks = Math.round(width * height * SCRATCH_NOISE_DENSITY);
    for (let index = 0; index < specks; index += 1) {
      context.fillStyle = SCRATCH_NOISE_COLORS[index % SCRATCH_NOISE_COLORS.length];
      context.fillRect(Math.random() * width, Math.random() * height, SCRATCH_NOISE_SIZE_PX, SCRATCH_NOISE_SIZE_PX);
    }
    context.fillStyle = SCRATCH_TEXT_COLOR;
    context.font = `${SCRATCH_FONT_WEIGHT} ${SCRATCH_FONT_SIZE_PX}px ${getComputedStyle(canvas).fontFamily}`;
    context.letterSpacing = SCRATCH_LETTER_SPACING;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(SCRATCH_TEXT, width * SCRATCH_TEXT_CENTER, height * SCRATCH_TEXT_CENTER);
    context.globalCompositeOperation = SCRATCH_ERASE_MODE;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(paint);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [paint]);

  const checkProgress = () => {
    const context = getContext();
    if (!context) return;
    const { data } = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
    if (getClearedRatio(data, SCRATCH_SAMPLE_STRIDE) >= SCRATCH_REVEAL_RATIO) onReveal();
  };

  const scratchTo = (point: ScratchPoint) => {
    const context = getContext();
    if (!context) return;
    for (const stamp of getStrokePoints(lastPoint.current ?? point, point, SCRATCH_STROKE_STEP_PX)) {
      context.beginPath();
      context.arc(stamp.x, stamp.y, SCRATCH_BRUSH_RADIUS_PX, 0, FULL_TURN_RADIANS);
      for (let index = 0; index < SCRATCH_ROUGH_STAMPS; index += 1) {
        const angle = Math.random() * FULL_TURN_RADIANS;
        const distance =
          SCRATCH_BRUSH_RADIUS_PX * (SCRATCH_ROUGH_MIN_DISTANCE + Math.random() * SCRATCH_ROUGH_DISTANCE_RANGE);
        const x = stamp.x + Math.cos(angle) * distance;
        const y = stamp.y + Math.sin(angle) * distance;
        context.moveTo(x, y);
        context.arc(x, y, SCRATCH_BRUSH_RADIUS_PX * SCRATCH_ROUGH_RADIUS_RATIO, 0, FULL_TURN_RADIANS);
      }
      context.fill();
    }
    lastPoint.current = point;
    strokes.current += 1;
    if (strokes.current % SCRATCH_CHECK_INTERVAL === 0) checkProgress();
  };

  const getPoint = (event: React.PointerEvent<HTMLButtonElement>): ScratchPoint => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const scaleX = bounds.width / event.currentTarget.offsetWidth;
    const scaleY = bounds.height / event.currentTarget.offsetHeight;
    return { x: (event.clientX - bounds.left) / scaleX, y: (event.clientY - bounds.top) / scaleY };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (revealed) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    scratching.current = true;
    lastPoint.current = null;
    setStarted(true);
    scratchTo(getPoint(event));
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!scratching.current || revealed) return;
    scratchTo(getPoint(event));
  };

  const handlePointerEnd = () => {
    if (!scratching.current) return;
    scratching.current = false;
    lastPoint.current = null;
    checkProgress();
  };

  return (
    <button
      type="button"
      aria-label={label}
      disabled={revealed}
      onClick={(event) => {
        if (event.detail === 0) onReveal();
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      style={{ cursor: SCRATCH_COIN_CURSOR }}
      className="absolute inset-0 touch-none rounded-[inherit] focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none"
    >
      <motion.canvas
        ref={canvasRef}
        className="size-full rounded-[inherit]"
        initial={false}
        animate={{ opacity: revealed ? 0 : 1 }}
        transition={{ duration: DURATION_SLOW, ease: EASE_OUT }}
      />
      {started || revealed ? null : (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-2 -mt-3 grid size-6 place-items-center rounded-full bg-amber-400 text-amber-800 shadow-sm ring-1 ring-amber-600/60"
          animate={reduceMotion ? undefined : { x: SCRATCH_HINT_TRAVEL_X, rotate: SCRATCH_HINT_ROTATE }}
          transition={{
            duration: SCRATCH_HINT_DURATION_SECONDS,
            ease: LOOP_EASE,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: SCRATCH_HINT_REPEAT_DELAY_SECONDS,
          }}
        >
          <Coins className="size-3.5" />
        </motion.span>
      )}
    </button>
  );
}
