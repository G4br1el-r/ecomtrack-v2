"use client";

import { motion, useReducedMotion } from "motion/react";

import type { IntegrationSceneLayout } from "@/@types/Modules/Core/Auth/login";
import {
  LOGIN_INTEGRATION_SCENES,
  LOGIN_SCENE_BADGE_OFFSET_RATIO,
  LOGIN_SCENE_BADGE_STROKE_WIDTH,
  LOGIN_SCENE_TIMING,
} from "@/constants/Modules/Core/Auth/login";
import {
  FLOAT_DURATION_SECONDS,
  FLOAT_OFFSET_Y,
  LOOP_EASE,
  SPRING_SNAPPY,
} from "@/constants/Modules/Core/DesignSystem/motion";
import { cn } from "@/lib/utils";

import { IntegrationFlow } from "../integration-flow";
import { SceneIcon } from "../scene-icon";

export function IntegrationScene({ layout, className }: { layout: IntegrationSceneLayout; className?: string }) {
  const scene = LOGIN_INTEGRATION_SCENES[layout];
  const reduceMotion = useReducedMotion();
  const { hub } = scene;
  const badgeDistance = hub.radius * LOGIN_SCENE_BADGE_OFFSET_RATIO;
  const badge = { x: hub.at.x + badgeDistance, y: hub.at.y - badgeDistance };

  return (
    <motion.svg
      aria-hidden="true"
      viewBox={`0 0 ${scene.width} ${scene.height}`}
      className={cn("w-full overflow-visible", className)}
      animate={reduceMotion ? undefined : { y: [0, -FLOAT_OFFSET_Y, 0] }}
      transition={{ duration: FLOAT_DURATION_SECONDS, ease: LOOP_EASE, repeat: Number.POSITIVE_INFINITY }}
    >
      {scene.channels.map((channel, order) => (
        <IntegrationFlow
          key={channel.icon}
          route={channel.route}
          origin={channel.at}
          order={order}
          packetRadius={scene.packetRadius}
        />
      ))}
      {scene.channels.map((channel, order) => {
        const delay = order * LOGIN_SCENE_TIMING.channelStaggerSeconds;
        return (
          <g key={channel.icon}>
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ...SPRING_SNAPPY, delay }}
            >
              <circle
                cx={channel.at.x}
                cy={channel.at.y}
                r={scene.channelHaloRadius}
                className="fill-primary-foreground/15"
              />
              <circle cx={channel.at.x} cy={channel.at.y} r={scene.channelRadius} className="fill-primary-foreground" />
            </motion.g>
            <SceneIcon
              name={channel.icon}
              at={channel.at}
              scale={scene.channelIconScale}
              delay={delay + LOGIN_SCENE_TIMING.iconDelaySeconds}
              className="text-brand-from"
            />
            {scene.labelOffset === null ? null : (
              <motion.text
                x={channel.at.x}
                y={channel.at.y + scene.labelOffset}
                textAnchor="middle"
                className="fill-primary-foreground/85 font-medium text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + LOGIN_SCENE_TIMING.iconDelaySeconds }}
              >
                {channel.label}
              </motion.text>
            )}
          </g>
        );
      })}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...SPRING_SNAPPY, delay: LOGIN_SCENE_TIMING.hubDelaySeconds }}
      >
        <circle cx={hub.at.x} cy={hub.at.y} r={hub.haloRadius} className="fill-primary-foreground/20" />
        <circle cx={hub.at.x} cy={hub.at.y} r={hub.radius} className="fill-primary-foreground" />
      </motion.g>
      <SceneIcon
        name="brand"
        at={hub.at}
        scale={hub.iconScale}
        delay={LOGIN_SCENE_TIMING.hubDelaySeconds + LOGIN_SCENE_TIMING.iconDelaySeconds}
        className="text-brand-from"
      />
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ ...SPRING_SNAPPY, delay: LOGIN_SCENE_TIMING.badgeDelaySeconds }}
      >
        <circle
          cx={badge.x}
          cy={badge.y}
          r={scene.badgeRadius}
          className="fill-success stroke-primary-foreground"
          strokeWidth={LOGIN_SCENE_BADGE_STROKE_WIDTH}
        />
        <SceneIcon
          name="check"
          at={badge}
          scale={scene.badgeIconScale}
          delay={LOGIN_SCENE_TIMING.badgeDelaySeconds}
          className="text-success-foreground"
        />
      </motion.g>
    </motion.svg>
  );
}
