import { describe, expect, it } from "vitest";

import type { DashboardOverview } from "@/@types/Modules/VisaoGeral/Dashboard/dashboard-overview";
import type { MeasureSummary } from "@/@types/Modules/VisaoGeral/Dashboard/sales-measure";

import { buildComparisonRows } from "./build-comparison-rows";
import { buildCustomerRows } from "./build-customer-rows";
import { buildDashboardKpis } from "./build-dashboard-kpis";
import { getMonthProjection } from "./get-month-projection";

const SUMMARY: MeasureSummary = { total: 150, previousTotal: 100, series: [50, 100], previousSeries: [40] };

const OVERVIEW: DashboardOverview = {
  granularity: "day",
  buckets: ["2026-10-03", "2026-10-04"],
  previousBuckets: ["2026-10-01"],
  metrics: {
    revenue: SUMMARY,
    orders: SUMMARY,
    averageTicket: SUMMARY,
    profit: { ...SUMMARY, previousTotal: 0 },
    productsSold: SUMMARY,
    unitsSold: SUMMARY,
  },
  customers: { newCustomers: SUMMARY, returningCustomers: { ...SUMMARY, series: [5, 6] } },
};

describe("buildComparisonRows", () => {
  it("alinha o período anterior pela posição e deixa vazio quando falta", () => {
    expect(buildComparisonRows(OVERVIEW, "revenue")).toEqual([
      { label: "03/10", title: "Sábado, 03/10/2026", current: 50, previous: 40, previousLabel: "01/10" },
      { label: "04/10", title: "Domingo, 04/10/2026", current: 100, previous: null, previousLabel: null },
    ]);
  });
});

describe("buildCustomerRows", () => {
  it("monta uma linha por intervalo com novos e recorrentes", () => {
    expect(buildCustomerRows(OVERVIEW)[1]).toEqual({
      label: "04/10",
      title: "Domingo, 04/10/2026",
      newCustomers: 100,
      returningCustomers: 6,
    });
  });
});

describe("buildDashboardKpis", () => {
  it("monta um indicador por métrica com a variação contra o período anterior", () => {
    const kpis = buildDashboardKpis(OVERVIEW);
    expect(kpis.map((kpi) => kpi.id)).toEqual([
      "revenue",
      "orders",
      "averageTicket",
      "profit",
      "productsSold",
      "unitsSold",
    ]);
    expect(kpis[0]).toMatchObject({ title: "Faturamento", value: 150, change: 0.5 });
    expect(kpis[3]?.change).toBeNull();
  });
});

describe("getMonthProjection", () => {
  it("projeta o fechamento pelo ritmo diário atual", () => {
    expect(getMonthProjection({ month: "2026-10", target: 0, achieved: 400, daysElapsed: 4, daysInMonth: 31 })).toBe(
      3100,
    );
  });

  it("devolve zero antes do primeiro dia", () => {
    expect(getMonthProjection({ month: "2026-10", target: 0, achieved: 0, daysElapsed: 0, daysInMonth: 31 })).toBe(0);
  });
});
