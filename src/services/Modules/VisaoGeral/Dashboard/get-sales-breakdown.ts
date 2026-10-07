import { getDay, parseISO } from "date-fns";

import type { DashboardPeriodQuery } from "@/@types/Modules/VisaoGeral/Dashboard/dashboard-overview";
import type { SalesBreakdown } from "@/@types/Modules/VisaoGeral/Dashboard/sales-breakdown";
import { MOCK_LATENCY_IN_MS } from "@/constants/Modules/Core/Shell/mock";
import { HOURS_PER_DAY, WEEKDAY_SHORT_LABELS } from "@/constants/Modules/VisaoGeral/Dashboard/heatmap";
import { distributeByWeights } from "@/lib/Modules/Core/DesignSystem/distribute-by-weights";
import { createSeededRandom } from "@/lib/Modules/Core/Shell/create-seeded-random";
import { wait } from "@/lib/Modules/Core/Shell/wait";
import { filterDailySales } from "@/lib/Modules/VisaoGeral/Dashboard/filter-daily-sales";
import { summarizeSales } from "@/lib/Modules/VisaoGeral/Dashboard/summarize-sales";
import { CHANNEL_SHARES_MOCK } from "@/mocks/Modules/VisaoGeral/Dashboard/channel-shares";
import { DAILY_SALES_MOCK } from "@/mocks/Modules/VisaoGeral/Dashboard/daily-sales";
import { HOURLY_WEIGHTS_MOCK } from "@/mocks/Modules/VisaoGeral/Dashboard/hourly-weights";
import { ORDER_STATUS_SHARES_MOCK } from "@/mocks/Modules/VisaoGeral/Dashboard/order-status-shares";
import { STATE_SHARES_MOCK } from "@/mocks/Modules/VisaoGeral/Dashboard/state-shares";

const NOISE_MIN = 0.85;
const NOISE_RANGE = 0.3;
const SUNDAY = 0;
const SATURDAY = 6;

export async function getSalesBreakdown(period: DashboardPeriodQuery): Promise<SalesBreakdown> {
  await wait(MOCK_LATENCY_IN_MS);
  const days = filterDailySales(DAILY_SALES_MOCK, period);
  const totals = summarizeSales(days);
  const random = createSeededRandom(days.length);

  const channelWeights = CHANNEL_SHARES_MOCK.map(
    (channel) => channel.revenueShare * (NOISE_MIN + random() * NOISE_RANGE),
  );
  const channelRevenue = distributeByWeights(totals.revenue, channelWeights);
  const channelOrders = distributeByWeights(
    totals.orders,
    channelWeights.map((weight, index) => weight / (CHANNEL_SHARES_MOCK[index]?.ticketFactor ?? 1)),
  );

  const stateWeights = STATE_SHARES_MOCK.map((state) => state.share * (NOISE_MIN + random() * NOISE_RANGE));
  const stateRevenue = distributeByWeights(totals.revenue, stateWeights);
  const stateOrders = distributeByWeights(totals.orders, stateWeights);

  const statusOrders = distributeByWeights(
    totals.orders,
    ORDER_STATUS_SHARES_MOCK.map((status) => status.share),
  );

  const hourly = WEEKDAY_SHORT_LABELS.map(() => Array.from({ length: HOURS_PER_DAY }, () => 0));
  for (const day of days) {
    const weekday = getDay(parseISO(day.date));
    const profile =
      weekday === SUNDAY || weekday === SATURDAY ? HOURLY_WEIGHTS_MOCK.weekend : HOURLY_WEIGHTS_MOCK.weekday;
    distributeByWeights(day.orders, profile).forEach((orders, hour) => {
      const row = hourly[weekday];
      if (row) row[hour] = (row[hour] ?? 0) + orders;
    });
  }

  return {
    channels: CHANNEL_SHARES_MOCK.map((channel, index) => ({
      id: channel.id,
      revenue: channelRevenue[index] ?? 0,
      orders: Math.round(channelOrders[index] ?? 0),
    })),
    statuses: ORDER_STATUS_SHARES_MOCK.map((status, index) => ({
      id: status.id,
      orders: Math.round(statusOrders[index] ?? 0),
    })),
    states: STATE_SHARES_MOCK.map((state, index) => ({
      code: state.code,
      revenue: stateRevenue[index] ?? 0,
      orders: Math.round(stateOrders[index] ?? 0),
    })),
    hourly: hourly.map((row) => row.map(Math.round)),
  };
}
