import type { DailySales } from "@/@types/Modules/VisaoGeral/Dashboard/daily-sales";
import type { Granularity } from "@/@types/Modules/VisaoGeral/Dashboard/granularity";
import type { PeriodSales } from "@/@types/Modules/VisaoGeral/Dashboard/sales-measure";

import { getBucketStart } from "./get-bucket-start";
import { summarizeSales } from "./summarize-sales";

export function summarizePeriod(days: DailySales[], granularity: Granularity): PeriodSales {
  const groups = new Map<string, DailySales[]>();
  for (const day of days) {
    const bucket = getBucketStart(day.date, granularity);
    groups.set(bucket, [...(groups.get(bucket) ?? []), day]);
  }
  return {
    buckets: [...groups.keys()],
    totals: summarizeSales(days),
    series: [...groups.values()].map(summarizeSales),
  };
}
