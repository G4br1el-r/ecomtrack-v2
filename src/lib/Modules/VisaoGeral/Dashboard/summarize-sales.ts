import type { DailySales } from "@/@types/Modules/VisaoGeral/Dashboard/daily-sales";
import type { SalesTotals } from "@/@types/Modules/VisaoGeral/Dashboard/sales-measure";
import { EMPTY_SALES_TOTALS } from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";

export function summarizeSales(days: DailySales[]): SalesTotals {
  const totals = days.reduce<SalesTotals>(
    (sum, day) => ({
      averageTicket: 0,
      revenue: sum.revenue + day.revenue,
      orders: sum.orders + day.orders,
      profit: sum.profit + day.profit,
      productsSold: sum.productsSold + day.productsSold,
      unitsSold: sum.unitsSold + day.unitsSold,
      newCustomers: sum.newCustomers + day.newCustomers,
      returningCustomers: sum.returningCustomers + day.returningCustomers,
    }),
    EMPTY_SALES_TOTALS,
  );
  return { ...totals, averageTicket: totals.orders === 0 ? 0 : totals.revenue / totals.orders };
}
