import type { Hotkey } from "@/@types/Modules/Core/Shell/hotkey";

export const COMMAND_PALETTE_HOTKEY: Hotkey = { key: "k", mod: true };
export const SIDEBAR_TOGGLE_HOTKEY: Hotkey = { key: "b", mod: true };
export const EDITABLE_TAG_NAMES = ["INPUT", "TEXTAREA", "SELECT"];
export const APPLE_PLATFORM_PATTERN = /Mac|iPhone|iPad|iPod/;
export const APPLE_MOD_KEY_LABEL = "⌘";
export const DEFAULT_MOD_KEY_LABEL = "Ctrl";
export const DEFAULT_HOTKEY_SEPARATOR = "+";
