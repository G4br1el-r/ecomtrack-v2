import type { CustomerRow, DashboardOverview } from "@/@types/Modules/VisaoGeral/Dashboard/dashboard-overview";

import { formatBucketLabel } from "./format-bucket-label";
import { formatBucketTitle } from "./format-bucket-title";

export function buildCustomerRows(overview: DashboardOverview): CustomerRow[] {
  const { newCustomers, returningCustomers } = overview.customers;
  return overview.buckets.map((bucket, index) => ({
    label: formatBucketLabel(bucket, overview.granularity),
    title: formatBucketTitle(bucket, overview.granularity),
    newCustomers: newCustomers.series[index] ?? 0,
    returningCustomers: returningCustomers.series[index] ?? 0,
  }));
}
