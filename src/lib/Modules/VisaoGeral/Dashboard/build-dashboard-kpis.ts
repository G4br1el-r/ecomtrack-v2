import type { DashboardKpi } from "@/@types/Modules/VisaoGeral/Dashboard/dashboard-metric";
import type { DashboardOverview } from "@/@types/Modules/VisaoGeral/Dashboard/dashboard-overview";
import { DASHBOARD_METRIC_IDS, DASHBOARD_METRICS } from "@/constants/Modules/VisaoGeral/Dashboard/metrics";
import { getVariation } from "@/lib/Modules/Core/DesignSystem/get-variation";

import { formatBucketTitle } from "./format-bucket-title";

export function buildDashboardKpis(overview: DashboardOverview): DashboardKpi[] {
  return DASHBOARD_METRIC_IDS.map((id) => {
    const summary = overview.metrics[id];
    const config = DASHBOARD_METRICS[id];
    return {
      id,
      title: config.title,
      kind: config.kind,
      value: summary.total,
      change: getVariation(summary.total, summary.previousTotal),
      series: overview.buckets.map((bucket, index) => ({
        label: formatBucketTitle(bucket, overview.granularity),
        value: summary.series[index] ?? 0,
      })),
    };
  });
}
