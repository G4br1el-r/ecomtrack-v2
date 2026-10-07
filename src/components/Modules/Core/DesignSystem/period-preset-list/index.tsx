"use client";

import { motion } from "motion/react";
import type { PeriodPresetId } from "@/@types/Modules/Core/DesignSystem/date-range";
import { SPRING_SNAPPY } from "@/constants/Modules/Core/DesignSystem/motion";
import { PERIOD_PRESET_IDS, PERIOD_PRESET_LABELS } from "@/constants/Modules/Core/DesignSystem/period-presets";
import { cn } from "@/lib/utils";

export function PeriodPresetList({
  activeId,
  onSelect,
}: {
  activeId?: PeriodPresetId;
  onSelect: (id: PeriodPresetId) => void;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      {PERIOD_PRESET_IDS.map((id) => {
        const isActive = activeId === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(id)}
            className={cn(
              "relative rounded-md px-2.5 py-1.5 text-left text-sm transition-colors hover:text-foreground",
              isActive ? "font-medium text-foreground" : "text-muted-foreground",
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="period-preset-active"
                transition={SPRING_SNAPPY}
                className="absolute inset-0 rounded-md bg-accent"
              />
            ) : null}
            <span className="relative">{PERIOD_PRESET_LABELS[id]}</span>
          </button>
        );
      })}
    </div>
  );
}
