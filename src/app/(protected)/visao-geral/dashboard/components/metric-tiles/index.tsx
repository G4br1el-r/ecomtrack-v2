"use client";

import { LayoutGroup } from "motion/react";

import { KpiCard } from "@/components/Modules/Core/DesignSystem/kpi-card";
import { KpiCardSkeleton } from "@/components/Modules/Core/DesignSystem/kpi-card-skeleton";
import { DASHBOARD_METRIC_IDS, DASHBOARD_METRICS } from "@/constants/Modules/VisaoGeral/Dashboard/metrics";
import { useDashboardOverview } from "@/hooks/Modules/VisaoGeral/Dashboard/use-dashboard-overview";
import { buildDashboardKpis } from "@/lib/Modules/VisaoGeral/Dashboard/build-dashboard-kpis";
import { cn } from "@/lib/utils";
import { useDashboardFiltersStore } from "@/store/Modules/VisaoGeral/Dashboard/dashboard-filters-store";

const GRID_CLASS = "grid gap-4 sm:grid-cols-2 xl:grid-cols-3";

export function MetricTiles() {
  const { data, isPlaceholderData } = useDashboardOverview();
  const metric = useDashboardFiltersStore((state) => state.metric);
  const setMetric = useDashboardFiltersStore((state) => state.setMetric);

  if (!data) {
    return (
      <div className={GRID_CLASS}>
        {DASHBOARD_METRIC_IDS.map((id) => (
          <KpiCardSkeleton key={id} />
        ))}
      </div>
    );
  }

  return (
    <LayoutGroup id="dashboard-metrics">
      <div className={cn(GRID_CLASS, "transition-opacity duration-200", isPlaceholderData && "opacity-60")}>
        {buildDashboardKpis(data).map((kpi) => {
          const Icon = DASHBOARD_METRICS[kpi.id].icon;
          return (
            <KpiCard
              key={kpi.id}
              kpi={kpi}
              icon={<Icon className="size-3.5" aria-hidden="true" />}
              selected={kpi.id === metric}
              onSelect={() => setMetric(kpi.id)}
            />
          );
        })}
      </div>
    </LayoutGroup>
  );
}
