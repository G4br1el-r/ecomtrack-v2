import type { Hotkey } from "@/@types/Modules/Core/Shell/hotkey";
import { APPLE_MOD_KEY_LABEL, DEFAULT_HOTKEY_SEPARATOR } from "@/constants/Modules/Core/Shell/hotkeys";

export function formatHotkey(hotkey: Hotkey, modKey: string): string {
  const key = hotkey.key.toUpperCase();
  if (!hotkey.mod) return key;
  return modKey === APPLE_MOD_KEY_LABEL ? `${modKey}${key}` : `${modKey}${DEFAULT_HOTKEY_SEPARATOR}${key}`;
}
