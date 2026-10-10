"use client";

import { usePreferencesSync } from "@/hooks/Modules/Core/Preferencias/use-preferences-sync";

export function PreferencesSync() {
  usePreferencesSync();
  return null;
}
