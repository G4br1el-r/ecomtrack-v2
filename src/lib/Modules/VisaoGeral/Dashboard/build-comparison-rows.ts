import type { DashboardMetricId } from "@/@types/Modules/VisaoGeral/Dashboard/dashboard-metric";
import type { ComparisonRow, DashboardOverview } from "@/@types/Modules/VisaoGeral/Dashboard/dashboard-overview";

import { formatBucketLabel } from "./format-bucket-label";
import { formatBucketTitle } from "./format-bucket-title";

export function buildComparisonRows(overview: DashboardOverview, metric: DashboardMetricId): ComparisonRow[] {
  const summary = overview.metrics[metric];
  return overview.buckets.map((bucket, index) => {
    const previousBucket = overview.previousBuckets[index];
    return {
      label: formatBucketLabel(bucket, overview.granularity),
      title: formatBucketTitle(bucket, overview.granularity),
      current: summary.series[index] ?? 0,
      previous: summary.previousSeries[index] ?? null,
      previousLabel: previousBucket ? formatBucketLabel(previousBucket, overview.granularity) : null,
    };
  });
}
