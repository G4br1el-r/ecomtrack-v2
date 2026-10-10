"use client";

import { motion } from "motion/react";

import type { SceneIconName, ScenePoint } from "@/@types/Modules/Core/Auth/login";
import {
  LOGIN_DRAWN_ICON_DRAW_SECONDS,
  LOGIN_DRAWN_ICON_STAGGER_SECONDS,
  LOGIN_DRAWN_ICON_STROKE_WIDTH,
  LOGIN_ICON_GRID_HALF,
  LOGIN_SCENE_ICON_PATHS,
} from "@/constants/Modules/Core/Auth/login";
import { EASE_OUT } from "@/constants/Modules/Core/DesignSystem/motion";

export function SceneIcon({
  name,
  at,
  scale,
  delay,
  className,
}: {
  name: SceneIconName;
  at: ScenePoint;
  scale: number;
  delay: number;
  className?: string;
}) {
  const offset = LOGIN_ICON_GRID_HALF * scale;
  return (
    <g
      transform={`translate(${at.x - offset} ${at.y - offset}) scale(${scale})`}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={LOGIN_DRAWN_ICON_STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {LOGIN_SCENE_ICON_PATHS[name].map((path, index) => (
        <motion.path
          key={path}
          d={path}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: LOGIN_DRAWN_ICON_DRAW_SECONDS,
            ease: EASE_OUT,
            delay: delay + index * LOGIN_DRAWN_ICON_STAGGER_SECONDS,
          }}
        />
      ))}
    </g>
  );
}
