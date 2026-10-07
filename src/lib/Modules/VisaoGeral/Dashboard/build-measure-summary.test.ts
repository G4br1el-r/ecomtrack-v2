import { describe, expect, it } from "vitest";

import type { PeriodSales } from "@/@types/Modules/VisaoGeral/Dashboard/sales-measure";
import { EMPTY_SALES_TOTALS } from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";

import { buildMeasureSummary } from "./build-measure-summary";

function period(values: number[]): PeriodSales {
  return {
    buckets: values.map((_, index) => `2026-10-0${index + 1}`),
    totals: { ...EMPTY_SALES_TOTALS, orders: values.reduce((total, value) => total + value, 0) },
    series: values.map((orders) => ({ ...EMPTY_SALES_TOTALS, orders })),
  };
}

describe("buildMeasureSummary", () => {
  it("extrai total e série da medida nos dois períodos", () => {
    expect(buildMeasureSummary("orders", period([1, 2]), period([3]))).toEqual({
      total: 3,
      previousTotal: 3,
      series: [1, 2],
      previousSeries: [3],
    });
  });
});
