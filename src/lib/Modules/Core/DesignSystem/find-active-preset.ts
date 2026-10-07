import { isSameDay } from "date-fns";

import type { DateRange, PeriodPresetId } from "@/@types/Modules/Core/DesignSystem/date-range";
import { PERIOD_PRESET_IDS } from "@/constants/Modules/Core/DesignSystem/period-presets";

import { resolvePeriodPreset } from "./resolve-period-preset";

export function findActivePreset({ from, to }: DateRange, now: Date): PeriodPresetId | undefined {
  if (!from || !to) return undefined;
  return PERIOD_PRESET_IDS.find((id) => {
    const range = resolvePeriodPreset(id, now);
    return isSameDay(range.from, from) && isSameDay(range.to, to);
  });
}
