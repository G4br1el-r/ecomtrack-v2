"use client";

import { motion } from "motion/react";

import type { LoginDrawnIconName } from "@/@types/Modules/Core/Auth/login";
import {
  LOGIN_DRAWN_ICON_DRAW_SECONDS,
  LOGIN_DRAWN_ICON_PATHS,
  LOGIN_DRAWN_ICON_STAGGER_SECONDS,
  LOGIN_DRAWN_ICON_STROKE_WIDTH,
} from "@/constants/Modules/Core/Auth/login";
import { EASE_OUT } from "@/constants/Modules/Core/DesignSystem/motion";
import { cn } from "@/lib/utils";

export function LoginDrawnIcon({
  name,
  delay = 0,
  className,
}: {
  name: LoginDrawnIconName;
  delay?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={LOGIN_DRAWN_ICON_STROKE_WIDTH}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-6", className)}
    >
      {LOGIN_DRAWN_ICON_PATHS[name].map((path, index) => (
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
    </svg>
  );
}
