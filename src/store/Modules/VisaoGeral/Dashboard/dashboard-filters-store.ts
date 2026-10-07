import { create } from "zustand";

import type { DateRange, ResolvedDateRange } from "@/@types/Modules/Core/DesignSystem/date-range";
import type { DashboardMetricId } from "@/@types/Modules/VisaoGeral/Dashboard/dashboard-metric";
import type { Granularity } from "@/@types/Modules/VisaoGeral/Dashboard/granularity";
import { DEFAULT_DASHBOARD_PERIOD } from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";
import { DEFAULT_DASHBOARD_METRIC } from "@/constants/Modules/VisaoGeral/Dashboard/metrics";
import { resolvePeriodPreset } from "@/lib/Modules/Core/DesignSystem/resolve-period-preset";
import { resolveGranularity } from "@/lib/Modules/VisaoGeral/Dashboard/resolve-granularity";

type DashboardFiltersState = {
  range: ResolvedDateRange;
  granularity: Granularity;
  compare: boolean;
  metric: DashboardMetricId;
  setRange: (range: DateRange) => void;
  setGranularity: (granularity: Granularity) => void;
  setCompare: (compare: boolean) => void;
  setMetric: (metric: DashboardMetricId) => void;
};

const initialRange = resolvePeriodPreset(DEFAULT_DASHBOARD_PERIOD, new Date());

export const useDashboardFiltersStore = create<DashboardFiltersState>()((set) => ({
  range: initialRange,
  granularity: resolveGranularity(initialRange),
  compare: true,
  metric: DEFAULT_DASHBOARD_METRIC,
  setRange: ({ from, to }) => {
    if (!from) return;
    const range = { from, to: to ?? from };
    set({ range, granularity: resolveGranularity(range) });
  },
  setGranularity: (granularity) => set({ granularity }),
  setCompare: (compare) => set({ compare }),
  setMetric: (metric) => set({ metric }),
}));
