import { describe, expect, it } from "vitest";

import { EMPTY_SALES_TOTALS } from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";

import { filterDailySales } from "./filter-daily-sales";

const DAYS = ["2026-09-30", "2026-10-01", "2026-10-02", "2026-10-03"].map((date) => ({ ...EMPTY_SALES_TOTALS, date }));

describe("filterDailySales", () => {
  it("mantém só os dias dentro do período, incluindo as pontas", () => {
    const dates = filterDailySales(DAYS, { from: "2026-10-01", to: "2026-10-02" }).map((day) => day.date);
    expect(dates).toEqual(["2026-10-01", "2026-10-02"]);
  });
});
