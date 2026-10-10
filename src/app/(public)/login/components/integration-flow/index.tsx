"use client";

import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

import type { ScenePoint } from "@/@types/Modules/Core/Auth/login";
import { LOGIN_SCENE_STATIC_PROGRESS, LOGIN_SCENE_TIMING } from "@/constants/Modules/Core/Auth/login";
import { LOOP_EASE } from "@/constants/Modules/Core/DesignSystem/motion";
import { getPathPointAt } from "@/lib/Modules/Core/Auth/get-path-point-at";

export function IntegrationFlow({
  route,
  origin,
  order,
  packetRadius,
}: {
  route: string;
  origin: ScenePoint;
  order: number;
  packetRadius: number;
}) {
  const reduceMotion = useReducedMotion();
  const routeRef = useRef<SVGPathElement>(null);
  const progress = useMotionValue(0);
  const packetX = useTransform(progress, (value) => getPathPointAt(routeRef.current, value, origin).x);
  const packetY = useTransform(progress, (value) => getPathPointAt(routeRef.current, value, origin).y);

  useEffect(() => {
    if (reduceMotion) {
      progress.set(LOGIN_SCENE_STATIC_PROGRESS);
      return;
    }
    const controls = animate(progress, [0, 1], {
      delay: LOGIN_SCENE_TIMING.packetDelaySeconds + order * LOGIN_SCENE_TIMING.packetStaggerSeconds,
      duration: LOGIN_SCENE_TIMING.packetLoopSeconds,
      ease: LOOP_EASE,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: LOGIN_SCENE_TIMING.packetPauseSeconds,
    });
    return () => controls.stop();
  }, [order, progress, reduceMotion]);

  return (
    <g>
      <path ref={routeRef} d={route} fill="none" stroke="none" />
      <motion.circle
        r={packetRadius}
        className="fill-primary-foreground"
        style={{ x: packetX, y: packetY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: LOGIN_SCENE_TIMING.packetDelaySeconds }}
      />
    </g>
  );
}
