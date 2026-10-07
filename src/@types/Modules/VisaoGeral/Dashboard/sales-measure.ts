import type { DashboardMetricId } from "./dashboard-metric";

export type SalesMeasureId = DashboardMetricId | "newCustomers" | "returningCustomers";

export type SalesTotals = Record<SalesMeasureId, number>;

export type PeriodSales = {
  buckets: string[];
  totals: SalesTotals;
  series: SalesTotals[];
};

export type MeasureSummary = {
  total: number;
  previousTotal: number;
  series: number[];
  previousSeries: number[];
};
