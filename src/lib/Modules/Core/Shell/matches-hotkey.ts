import type { Hotkey, HotkeyEvent } from "@/@types/Modules/Core/Shell/hotkey";

export function matchesHotkey(event: HotkeyEvent, hotkey: Hotkey): boolean {
  const modPressed = event.metaKey || event.ctrlKey;
  if (Boolean(hotkey.mod) !== modPressed) return false;
  return event.key.toLowerCase() === hotkey.key.toLowerCase();
}
