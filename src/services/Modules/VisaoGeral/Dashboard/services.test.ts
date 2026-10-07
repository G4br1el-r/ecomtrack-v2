import { subDays } from "date-fns";
import { describe, expect, it, vi } from "vitest";

import { TOP_PRODUCTS_LIMIT } from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";
import { formatIsoDate } from "@/lib/Modules/Core/DesignSystem/format-iso-date";

import { getDashboardOverview } from "./get-dashboard-overview";
import { getMonthlyGoal } from "./get-monthly-goal";
import { getSalesBreakdown } from "./get-sales-breakdown";
import { getTopProducts } from "./get-top-products";

vi.mock("@/lib/Modules/Core/Shell/wait", () => ({ wait: () => Promise.resolve() }));

const LAST_30_DAYS = 29;
const TODAY = new Date();
const PERIOD = { from: formatIsoDate(subDays(TODAY, LAST_30_DAYS)), to: formatIsoDate(TODAY) };
const EMPTY_PERIOD = { from: "2001-01-01", to: "2001-01-31" };
const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);

describe("getDashboardOverview", () => {
  it("devolve um ponto por dia e os totais dos dois períodos", async () => {
    const overview = await getDashboardOverview({ ...PERIOD, granularity: "day" });
    expect(overview.buckets).toHaveLength(LAST_30_DAYS + 1);
    expect(overview.metrics.revenue.total).toBeGreaterThan(0);
    expect(overview.metrics.revenue.previousTotal).toBeGreaterThan(0);
  });

  it("mantém o ticket médio como faturamento ÷ pedidos", async () => {
    const { metrics } = await getDashboardOverview({ ...PERIOD, granularity: "week" });
    expect(metrics.averageTicket.total).toBeCloseTo(metrics.revenue.total / metrics.orders.total);
  });

  it("devolve séries vazias para um período sem vendas", async () => {
    const overview = await getDashboardOverview({ ...EMPTY_PERIOD, granularity: "day" });
    expect(overview.buckets).toEqual([]);
    expect(overview.metrics.orders.total).toBe(0);
  });
});

describe("getSalesBreakdown", () => {
  it("reparte o faturamento do período entre canais e estados sem sobrar nem faltar", async () => {
    const [breakdown, overview] = await Promise.all([
      getSalesBreakdown(PERIOD),
      getDashboardOverview({ ...PERIOD, granularity: "day" }),
    ]);
    const revenue = overview.metrics.revenue.total;
    expect(sum(breakdown.channels.map((channel) => channel.revenue))).toBeCloseTo(revenue);
    expect(sum(breakdown.states.map((state) => state.revenue))).toBeCloseTo(revenue);
  });

  it("monta o mapa de calor 7 × 24", async () => {
    const { hourly } = await getSalesBreakdown(PERIOD);
    expect(hourly).toHaveLength(7);
    expect(hourly.every((row) => row.length === 24)).toBe(true);
  });

  it("zera tudo num período sem vendas", async () => {
    const breakdown = await getSalesBreakdown(EMPTY_PERIOD);
    expect(sum(breakdown.statuses.map((status) => status.orders))).toBe(0);
    expect(sum(breakdown.hourly.flat())).toBe(0);
  });
});

describe("getTopProducts", () => {
  it("devolve os 10 mais vendidos ordenados por faturamento e numerados", async () => {
    const products = await getTopProducts(PERIOD);
    expect(products).toHaveLength(TOP_PRODUCTS_LIMIT);
    expect(products.map((product) => product.rank)).toEqual(
      Array.from({ length: TOP_PRODUCTS_LIMIT }, (_, i) => i + 1),
    );
    const revenues = products.map((product) => product.revenue);
    expect(revenues).toEqual([...revenues].sort((first, second) => second - first));
  });

  it("devolve lista vazia quando não houve venda", async () => {
    expect(await getTopProducts(EMPTY_PERIOD)).toEqual([]);
  });
});

describe("getMonthlyGoal", () => {
  it("devolve a meta e o realizado do mês corrente até hoje", async () => {
    const goal = await getMonthlyGoal();
    expect(goal.target).toBeGreaterThan(0);
    expect(goal.daysElapsed).toBe(TODAY.getDate());
    expect(goal.daysElapsed).toBeLessThanOrEqual(goal.daysInMonth);
  });
});
