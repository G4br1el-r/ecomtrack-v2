"use client";

import { AnimatePresence, motion } from "motion/react";

import { Switch } from "@/components/animate-ui/components/radix/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/animate-ui/components/radix/toggle-group";
import { DateRangeField } from "@/components/Modules/Core/DesignSystem/date-range-field";
import { Label } from "@/components/ui/label";
import { ENTER_OFFSET_Y } from "@/constants/Modules/Core/DesignSystem/motion";
import { DEFAULT_DASHBOARD_PERIOD, PREVIOUS_PERIOD_LABEL } from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";
import { GRANULARITIES, GRANULARITY_LABELS } from "@/constants/Modules/VisaoGeral/Dashboard/granularity";
import { formatPeriodLabel } from "@/lib/Modules/Core/DesignSystem/format-period-label";
import { resolvePeriodPreset } from "@/lib/Modules/Core/DesignSystem/resolve-period-preset";
import { getPreviousPeriod } from "@/lib/Modules/VisaoGeral/Dashboard/get-previous-period";
import { isGranularity } from "@/lib/Modules/VisaoGeral/Dashboard/is-granularity";
import { useDashboardFiltersStore } from "@/store/Modules/VisaoGeral/Dashboard/dashboard-filters-store";

export function DashboardToolbar() {
  const range = useDashboardFiltersStore((state) => state.range);
  const granularity = useDashboardFiltersStore((state) => state.granularity);
  const compare = useDashboardFiltersStore((state) => state.compare);
  const setRange = useDashboardFiltersStore((state) => state.setRange);
  const setGranularity = useDashboardFiltersStore((state) => state.setGranularity);
  const setCompare = useDashboardFiltersStore((state) => state.setCompare);

  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:items-end">
      <div className="flex flex-wrap items-center gap-2">
        <DateRangeField
          value={range}
          onChange={setRange}
          defaultRange={resolvePeriodPreset(DEFAULT_DASHBOARD_PERIOD, new Date())}
          className="w-full sm:w-60"
        />
        <ToggleGroup
          type="single"
          variant="outline"
          size="sm"
          value={granularity}
          onValueChange={(value: string) => {
            if (isGranularity(value)) setGranularity(value);
          }}
          aria-label="Agrupar por"
        >
          {GRANULARITIES.map((item) => (
            <ToggleGroupItem key={item} value={item} className="px-3">
              {GRANULARITY_LABELS[item]}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Label className="flex h-9 cursor-pointer items-center gap-2 rounded-md border bg-background px-3 font-normal shadow-xs transition-colors hover:bg-accent has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50">
          <Switch checked={compare} onCheckedChange={setCompare} />
          Comparar
        </Label>
      </div>
      <AnimatePresence initial={false}>
        {compare ? (
          <motion.p
            initial={{ opacity: 0, y: -ENTER_OFFSET_Y }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -ENTER_OFFSET_Y }}
            className="text-xs text-muted-foreground"
          >
            {PREVIOUS_PERIOD_LABEL}:{" "}
            <span className="font-medium text-foreground tabular-nums">
              {formatPeriodLabel(getPreviousPeriod(range))}
            </span>
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
