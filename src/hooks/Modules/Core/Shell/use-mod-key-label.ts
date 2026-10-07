"use client";

import { useSyncExternalStore } from "react";

import { APPLE_MOD_KEY_LABEL } from "@/constants/Modules/Core/Shell/hotkeys";
import { getModKeyLabel } from "@/lib/Modules/Core/Shell/get-mod-key-label";

export function useModKeyLabel() {
  return useSyncExternalStore(
    () => () => undefined,
    () => getModKeyLabel(navigator.userAgent),
    () => APPLE_MOD_KEY_LABEL,
  );
}
