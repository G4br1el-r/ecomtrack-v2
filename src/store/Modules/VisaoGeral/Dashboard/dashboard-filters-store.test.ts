import { beforeEach, describe, expect, it } from "vitest";

import { useDashboardFiltersStore } from "./dashboard-filters-store";

const INITIAL = useDashboardFiltersStore.getState();

describe("useDashboardFiltersStore", () => {
  beforeEach(() => {
    useDashboardFiltersStore.setState(INITIAL);
  });

  it("começa nos últimos 30 dias, por dia, comparando, em faturamento", () => {
    expect(useDashboardFiltersStore.getState()).toMatchObject({ granularity: "day", compare: true, metric: "revenue" });
  });

  it("recalcula o agrupamento ao trocar o período", () => {
    useDashboardFiltersStore.getState().setRange({ from: new Date(2026, 0, 1), to: new Date(2026, 11, 31) });
    expect(useDashboardFiltersStore.getState().granularity).toBe("month");
  });

  it("trata seleção de um dia só como período de um dia", () => {
    const day = new Date(2026, 9, 4);
    useDashboardFiltersStore.getState().setRange({ from: day });
    expect(useDashboardFiltersStore.getState().range).toEqual({ from: day, to: day });
  });

  it("ignora período sem data inicial", () => {
    useDashboardFiltersStore.getState().setRange({});
    expect(useDashboardFiltersStore.getState().range).toEqual(INITIAL.range);
  });

  it("permite escolher o agrupamento e a métrica", () => {
    useDashboardFiltersStore.getState().setGranularity("week");
    useDashboardFiltersStore.getState().setMetric("profit");
    expect(useDashboardFiltersStore.getState()).toMatchObject({ granularity: "week", metric: "profit" });
  });
});
