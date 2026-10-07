import type { PERIOD_PRESET_IDS } from "@/constants/Modules/Core/DesignSystem/period-presets";

export type DateRange = {
  from?: Date;
  to?: Date;
};

export type ResolvedDateRange = Required<DateRange>;

export type PeriodPresetId = (typeof PERIOD_PRESET_IDS)[number];
