import { describe, expect, it } from "vitest";

import type { DailySales } from "@/@types/Modules/VisaoGeral/Dashboard/daily-sales";

import { summarizeSales } from "./summarize-sales";

const DAY: DailySales = {
  date: "2026-10-01",
  revenue: 1000,
  orders: 10,
  profit: 300,
  productsSold: 6,
  unitsSold: 14,
  newCustomers: 3,
  returningCustomers: 5,
};

describe("summarizeSales", () => {
  it("soma as medidas do período", () => {
    const totals = summarizeSales([DAY, { ...DAY, date: "2026-10-02", revenue: 3000 }]);
    expect(totals).toMatchObject({ revenue: 4000, orders: 20, unitsSold: 28, newCustomers: 6 });
  });

  it("calcula o ticket médio como faturamento ÷ pedidos, não média das médias", () => {
    const totals = summarizeSales([
      { ...DAY, revenue: 100, orders: 1 },
      { ...DAY, revenue: 900, orders: 9 },
    ]);
    expect(totals.averageTicket).toBe(100);
  });

  it("zera o ticket médio quando não há pedidos", () => {
    expect(summarizeSales([]).averageTicket).toBe(0);
  });
});
