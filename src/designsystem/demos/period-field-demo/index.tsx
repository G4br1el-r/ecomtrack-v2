"use client";

import { useState } from "react";

import type { DateRange } from "@/@types/Modules/Core/DesignSystem/date-range";
import { DateRangeField } from "@/components/Modules/Core/DesignSystem/date-range-field";
import { resolvePeriodPreset } from "@/lib/Modules/Core/DesignSystem/resolve-period-preset";

import { DEMO_DEFAULT_PERIOD } from "../../mocks/demo";

export function PeriodFieldDemo() {
  const [defaultRange] = useState<DateRange>(() => resolvePeriodPreset(DEMO_DEFAULT_PERIOD, new Date()));
  const [period, setPeriod] = useState<DateRange>(defaultRange);
  return <DateRangeField value={period} onChange={setPeriod} defaultRange={defaultRange} className="w-full" />;
}
