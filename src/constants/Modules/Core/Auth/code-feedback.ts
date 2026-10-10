import type { CodeFeedbackTone } from "@/@types/Modules/Core/Auth/code-feedback";

export const CODE_FEEDBACK_TONE_CLASS: Record<CodeFeedbackTone, string> = {
  success: "border-success bg-success-soft text-success",
  error: "border-destructive bg-destructive-soft text-destructive",
};

export const CODE_FEEDBACK_TEXT_CLASS: Record<CodeFeedbackTone, string> = {
  success: "text-success",
  error: "text-destructive",
};

export const CODE_SUCCESS_SHIELD = {
  staggerSeconds: 0.04,
  durationSeconds: 0.35,
  iconDelaySeconds: 0.5,
  iconTilt: -25,
  holdMs: 500,
} as const;

export const CODE_FAILURE_DROP = {
  fallPx: 52,
  tiltDegrees: 35,
  staggerSeconds: 0.06,
  delaySeconds: 0.2,
  durationSeconds: 0.5,
  ease: [0.55, 0, 1, 0.45],
} as const;
