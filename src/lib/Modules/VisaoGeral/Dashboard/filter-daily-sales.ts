import type { DailySales } from "@/@types/Modules/VisaoGeral/Dashboard/daily-sales";
import type { DashboardPeriodQuery } from "@/@types/Modules/VisaoGeral/Dashboard/dashboard-overview";

export function filterDailySales(days: DailySales[], { from, to }: DashboardPeriodQuery): DailySales[] {
  return days.filter((day) => day.date >= from && day.date <= to);
}
