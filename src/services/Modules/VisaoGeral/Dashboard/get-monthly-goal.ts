import { getDate, getDaysInMonth, startOfDay, startOfMonth } from "date-fns";

import type { MonthlyGoal } from "@/@types/Modules/VisaoGeral/Dashboard/monthly-goal";
import { MOCK_LATENCY_IN_MS } from "@/constants/Modules/Core/Shell/mock";
import { formatIsoDate } from "@/lib/Modules/Core/DesignSystem/format-iso-date";
import { wait } from "@/lib/Modules/Core/Shell/wait";
import { filterDailySales } from "@/lib/Modules/VisaoGeral/Dashboard/filter-daily-sales";
import { summarizeSales } from "@/lib/Modules/VisaoGeral/Dashboard/summarize-sales";
import { DAILY_SALES_MOCK } from "@/mocks/Modules/VisaoGeral/Dashboard/daily-sales";
import { MONTHLY_GOAL_MOCK } from "@/mocks/Modules/VisaoGeral/Dashboard/monthly-goal";

export async function getMonthlyGoal(): Promise<MonthlyGoal> {
  await wait(MOCK_LATENCY_IN_MS);
  const today = startOfDay(new Date());
  const month = formatIsoDate(startOfMonth(today));
  const { revenue } = summarizeSales(filterDailySales(DAILY_SALES_MOCK, { from: month, to: formatIsoDate(today) }));
  return {
    month,
    target: MONTHLY_GOAL_MOCK.target,
    achieved: revenue,
    daysElapsed: getDate(today),
    daysInMonth: getDaysInMonth(today),
  };
}
