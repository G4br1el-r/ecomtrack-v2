"use client";

import { EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";

export function IgnoredToggle({
  count,
  pressed,
  onPressedChange,
}: {
  count: number;
  pressed: boolean;
  onPressedChange: (pressed: boolean) => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => onPressedChange(!pressed)}
      className={cn(
        "inline-flex h-9 shrink-0 items-center gap-2 rounded-md border px-3 text-sm font-medium shadow-xs transition-colors focus-visible:ring-3 focus-visible:ring-ring focus-visible:outline-none active:scale-[0.98]",
        pressed
          ? "border-primary bg-primary text-primary-foreground hover:opacity-90"
          : "border-input bg-background hover:bg-muted",
      )}
    >
      <EyeOff className="size-4" aria-hidden="true" />
      Ignorados
      <span
        className={cn(
          "grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-xs tabular-nums",
          pressed ? "bg-background text-primary" : "bg-muted text-muted-foreground",
        )}
      >
        {count}
      </span>
    </button>
  );
}
