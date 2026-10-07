"use client";

import { useEffect } from "react";

import type { Hotkey } from "@/@types/Modules/Core/Shell/hotkey";
import { isEditableTarget } from "@/lib/Modules/Core/Shell/is-editable-target";
import { matchesHotkey } from "@/lib/Modules/Core/Shell/matches-hotkey";

export function useHotkey(hotkey: Hotkey, onTrigger: () => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!matchesHotkey(event, hotkey)) return;
      if (!hotkey.mod && isEditableTarget(event.target)) return;
      event.preventDefault();
      onTrigger();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hotkey, onTrigger]);
}
