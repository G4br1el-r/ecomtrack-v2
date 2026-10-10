"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

import type { EdgeOrientation } from "@/@types/Modules/Core/Auth/login";
import { LOGIN_WAVE_LAYERS, LOGIN_WAVE_THICKNESS_PX, LOGIN_WAVE_TONE_CLASS } from "@/constants/Modules/Core/Auth/login";
import { LINEAR_EASE } from "@/constants/Modules/Core/DesignSystem/motion";
import { buildWaveTilePath } from "@/lib/Modules/Core/Auth/build-wave-tile-path";
import { cn } from "@/lib/utils";

const COVER_SIZE = "300%";

export function WaveEdge({ orientation, className }: { orientation: EdgeOrientation; className?: string }) {
  const id = useId();
  const reduceMotion = useReducedMotion();
  const vertical = orientation === "vertical";
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
      style={vertical ? { width: LOGIN_WAVE_THICKNESS_PX } : { height: LOGIN_WAVE_THICKNESS_PX }}
    >
      <defs>
        {LOGIN_WAVE_LAYERS.map((layer) => (
          <pattern
            key={layer.id}
            id={`${id}-${layer.id}`}
            patternUnits="userSpaceOnUse"
            width={vertical ? LOGIN_WAVE_THICKNESS_PX : layer.wavelength}
            height={vertical ? layer.wavelength : LOGIN_WAVE_THICKNESS_PX}
          >
            <path
              d={buildWaveTilePath(layer, LOGIN_WAVE_THICKNESS_PX, orientation)}
              className={LOGIN_WAVE_TONE_CLASS[layer.tone]}
            />
          </pattern>
        ))}
      </defs>
      {LOGIN_WAVE_LAYERS.map((layer) => {
        const shift = [0, layer.wavelength * layer.direction];
        return (
          <motion.rect
            key={layer.id}
            x={vertical ? 0 : -layer.wavelength}
            y={vertical ? -layer.wavelength : 0}
            width={vertical ? "100%" : COVER_SIZE}
            height={vertical ? COVER_SIZE : "100%"}
            fill={`url(#${id}-${layer.id})`}
            animate={reduceMotion ? undefined : vertical ? { y: shift } : { x: shift }}
            transition={{ duration: layer.durationSeconds, ease: LINEAR_EASE, repeat: Number.POSITIVE_INFINITY }}
          />
        );
      })}
    </svg>
  );
}
