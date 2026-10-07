import type { DashboardMetricId } from "./dashboard-metric";
import type { Granularity } from "./granularity";
import type { MeasureSummary } from "./sales-measure";

export type DashboardPeriodQuery = {
  from: string;
  to: string;
};

export type DashboardOverviewQuery = DashboardPeriodQuery & {
  granularity: Granularity;
};

export type DashboardOverview = {
  granularity: Granularity;
  buckets: string[];
  previousBuckets: string[];
  metrics: Record<DashboardMetricId, MeasureSummary>;
  customers: {
    newCustomers: MeasureSummary;
    returningCustomers: MeasureSummary;
  };
};

export type ComparisonRow = {
  label: string;
  title: string;
  current: number;
  previous: number | null;
  previousLabel: string | null;
};

export type CustomerRow = {
  label: string;
  title: string;
  newCustomers: number;
  returningCustomers: number;
};
