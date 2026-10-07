import type { DashboardPeriodQuery } from "@/@types/Modules/VisaoGeral/Dashboard/dashboard-overview";
import type { TopProduct } from "@/@types/Modules/VisaoGeral/Dashboard/top-product";
import { MOCK_LATENCY_IN_MS } from "@/constants/Modules/Core/Shell/mock";
import { TOP_PRODUCTS_LIMIT } from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";
import { getShare } from "@/lib/Modules/Core/DesignSystem/get-share";
import { createSeededRandom } from "@/lib/Modules/Core/Shell/create-seeded-random";
import { wait } from "@/lib/Modules/Core/Shell/wait";
import { filterDailySales } from "@/lib/Modules/VisaoGeral/Dashboard/filter-daily-sales";
import { summarizeSales } from "@/lib/Modules/VisaoGeral/Dashboard/summarize-sales";
import { DAILY_SALES_MOCK } from "@/mocks/Modules/VisaoGeral/Dashboard/daily-sales";
import { PRODUCT_SALES_PROFILES_MOCK } from "@/mocks/Modules/VisaoGeral/Dashboard/product-sales-profiles";

const UNITS_NOISE_MIN = 0.8;
const UNITS_NOISE_RANGE = 0.4;

export async function getTopProducts(period: DashboardPeriodQuery): Promise<TopProduct[]> {
  await wait(MOCK_LATENCY_IN_MS);
  const days = filterDailySales(DAILY_SALES_MOCK, period);
  const totals = summarizeSales(days);
  if (totals.revenue === 0) return [];
  const activeDays = days.filter((day) => day.orders > 0).length;
  const random = createSeededRandom(activeDays);
  return PRODUCT_SALES_PROFILES_MOCK.map((profile) => {
    const unitsSold = Math.round(profile.dailyUnits * activeDays * (UNITS_NOISE_MIN + random() * UNITS_NOISE_RANGE));
    const revenue = unitsSold * profile.unitPrice;
    const profit = unitsSold * (profile.unitPrice - profile.unitCost);
    return {
      id: profile.id,
      rank: 0,
      name: profile.name,
      sku: profile.sku,
      unitsSold,
      revenue,
      profit,
      revenueShare: getShare(revenue, totals.revenue),
      profitShare: getShare(profit, totals.profit),
      ordersShare: getShare(unitsSold * profile.ordersPerUnit, totals.orders),
    };
  })
    .filter((product) => product.unitsSold > 0)
    .sort((first, second) => second.revenue - first.revenue)
    .slice(0, TOP_PRODUCTS_LIMIT)
    .map((product, index) => ({ ...product, rank: index + 1 }));
}
