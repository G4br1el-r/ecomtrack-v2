"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { COPY_FEEDBACK_DURATION_MS } from "@/constants/Modules/Core/DesignSystem/ui";

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    },
    [],
  );

  const copy = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return false;
    }
    setCopied(true);
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setCopied(false), COPY_FEEDBACK_DURATION_MS);
    return true;
  }, []);

  return { copied, copy };
}
