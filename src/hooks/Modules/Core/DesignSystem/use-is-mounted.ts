"use client";

import { useSyncExternalStore } from "react";

export function useIsMounted() {
  return useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
}
