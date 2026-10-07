import {
  APPLE_MOD_KEY_LABEL,
  APPLE_PLATFORM_PATTERN,
  DEFAULT_MOD_KEY_LABEL,
} from "@/constants/Modules/Core/Shell/hotkeys";

export function getModKeyLabel(userAgent: string): string {
  return APPLE_PLATFORM_PATTERN.test(userAgent) ? APPLE_MOD_KEY_LABEL : DEFAULT_MOD_KEY_LABEL;
}
