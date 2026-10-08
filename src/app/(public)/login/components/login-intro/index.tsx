"use client";

import { motion } from "motion/react";
import { useState } from "react";

import {
  LOGIN_CLOUD_THICKNESS_PX,
  LOGIN_INTRO_COLLAPSE_DELAY_SECONDS,
  LOGIN_INTRO_COLLAPSE_SECONDS,
  LOGIN_INTRO_SPLASH_HEIGHT,
  LOGIN_MOBILE_HEADER_BOTTOM_SPACE_PX,
  LOGIN_MOBILE_HEADER_HEIGHT,
} from "@/constants/Modules/Core/Auth/login";
import { EASE_OUT, POP_SCALE, SPRING_SOFT } from "@/constants/Modules/Core/DesignSystem/motion";

import { CloudEdge } from "../cloud-edge";
import { LoginBrandMark } from "../login-brand-mark";

const COLLAPSE_TRANSITION = {
  delay: LOGIN_INTRO_COLLAPSE_DELAY_SECONDS,
  duration: LOGIN_INTRO_COLLAPSE_SECONDS,
  ease: EASE_OUT,
};

export function LoginIntro() {
  const [finished, setFinished] = useState(false);
  if (finished) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-linear-to-b from-brand-from to-brand-to text-center text-primary-foreground lg:hidden"
      initial={{ height: LOGIN_INTRO_SPLASH_HEIGHT, paddingBottom: 0 }}
      animate={{ height: LOGIN_MOBILE_HEADER_HEIGHT, paddingBottom: LOGIN_MOBILE_HEADER_BOTTOM_SPACE_PX }}
      transition={COLLAPSE_TRANSITION}
      onAnimationComplete={() => setFinished(true)}
    >
      <motion.div
        initial={{ opacity: 0, scale: POP_SCALE }}
        animate={{ opacity: 1, scale: 1 }}
        transition={SPRING_SOFT}
      >
        <LoginBrandMark />
      </motion.div>
      <motion.div
        className="absolute inset-x-0 bottom-0"
        style={{ height: LOGIN_CLOUD_THICKNESS_PX }}
        initial={{ y: LOGIN_CLOUD_THICKNESS_PX }}
        animate={{ y: 0 }}
        transition={COLLAPSE_TRANSITION}
      >
        <CloudEdge orientation="horizontal" className="inset-x-0 bottom-0 w-full" />
      </motion.div>
    </motion.div>
  );
}
