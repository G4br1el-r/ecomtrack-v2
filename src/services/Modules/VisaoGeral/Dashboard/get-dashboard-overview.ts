import { parseISO } from "date-fns";

import type {
  DashboardOverview,
  DashboardOverviewQuery,
} from "@/@types/Modules/VisaoGeral/Dashboard/dashboard-overview";
import { MOCK_LATENCY_IN_MS } from "@/constants/Modules/Core/Shell/mock";
import { formatIsoDate } from "@/lib/Modules/Core/DesignSystem/format-iso-date";
import { wait } from "@/lib/Modules/Core/Shell/wait";
import { buildMeasureSummary } from "@/lib/Modules/VisaoGeral/Dashboard/build-measure-summary";
import { filterDailySales } from "@/lib/Modules/VisaoGeral/Dashboard/filter-daily-sales";
import { getPreviousPeriod } from "@/lib/Modules/VisaoGeral/Dashboard/get-previous-period";
import { summarizePeriod } from "@/lib/Modules/VisaoGeral/Dashboard/summarize-period";
import { DAILY_SALES_MOCK } from "@/mocks/Modules/VisaoGeral/Dashboard/daily-sales";

export async function getDashboardOverview({
  from,
  to,
  granularity,
}: DashboardOverviewQuery): Promise<DashboardOverview> {
  await wait(MOCK_LATENCY_IN_MS);
  const previousRange = getPreviousPeriod({ from: parseISO(from), to: parseISO(to) });
  const current = summarizePeriod(filterDailySales(DAILY_SALES_MOCK, { from, to }), granularity);
  const previous = summarizePeriod(
    filterDailySales(DAILY_SALES_MOCK, {
      from: formatIsoDate(previousRange.from),
      to: formatIsoDate(previousRange.to),
    }),
    granularity,
  );
  return {
    granularity,
    buckets: current.buckets,
    previousBuckets: previous.buckets,
    metrics: {
      revenue: buildMeasureSummary("revenue", current, previous),
      orders: buildMeasureSummary("orders", current, previous),
      averageTicket: buildMeasureSummary("averageTicket", current, previous),
      profit: buildMeasureSummary("profit", current, previous),
      productsSold: buildMeasureSummary("productsSold", current, previous),
      unitsSold: buildMeasureSummary("unitsSold", current, previous),
    },
    customers: {
      newCustomers: buildMeasureSummary("newCustomers", current, previous),
      returningCustomers: buildMeasureSummary("returningCustomers", current, previous),
    },
  };
}
