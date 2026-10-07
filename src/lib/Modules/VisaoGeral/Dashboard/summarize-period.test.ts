import { describe, expect, it } from "vitest";

import { EMPTY_SALES_TOTALS } from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";

import { summarizePeriod } from "./summarize-period";

const DAYS = ["2026-09-27", "2026-09-28", "2026-09-29", "2026-10-05"].map((date) => ({
  ...EMPTY_SALES_TOTALS,
  date,
  revenue: 100,
  orders: 2,
}));

describe("summarizePeriod", () => {
  it("agrupa os dias por semana mantendo a ordem", () => {
    const period = summarizePeriod(DAYS, "week");
    expect(period.buckets).toEqual(["2026-09-21", "2026-09-28", "2026-10-05"]);
    expect(period.series.map((totals) => totals.revenue)).toEqual([100, 200, 100]);
  });

  it("calcula o total do período inteiro", () => {
    expect(summarizePeriod(DAYS, "day").totals.revenue).toBe(400);
  });

  it("devolve período vazio sem dias", () => {
    expect(summarizePeriod([], "month")).toMatchObject({ buckets: [], series: [] });
  });
});
