import { getDate, getDay, getMonth, startOfDay, subDays } from "date-fns";

import type { DailySales } from "@/@types/Modules/VisaoGeral/Dashboard/daily-sales";
import { formatIsoDate } from "@/lib/Modules/Core/DesignSystem/format-iso-date";
import { createSeededRandom } from "@/lib/Modules/Core/Shell/create-seeded-random";

const HISTORY_DAYS = 800;
const SEED = 20260101;
const BASE_ORDERS = 140;
const BASE_TICKET = 186;
const TREND_GROWTH = 0.4;
const NOISE_MIN = 0.85;
const NOISE_RANGE = 0.3;
const WEEKDAY_FACTOR = [0.72, 1.12, 1.06, 1.02, 0.98, 0.95, 0.8];
const TICKET_MIN = 0.9;
const TICKET_RANGE = 0.2;
const MARGIN_MIN = 0.24;
const MARGIN_RANGE = 0.1;
const UNITS_PER_ORDER_MIN = 1.3;
const UNITS_PER_ORDER_RANGE = 0.45;
const DISTINCT_SKU_MIN = 0.5;
const DISTINCT_SKU_RANGE = 0.15;
const NEW_CUSTOMERS_MIN = 0.3;
const NEW_CUSTOMERS_RANGE = 0.12;
const RETURNING_CUSTOMERS_MIN = 0.48;
const RETURNING_CUSTOMERS_RANGE = 0.1;
const CENTS = 100;
const NOVEMBER = 10;
const FRIDAY = 5;
const BLACK_FRIDAY_FIRST_DAY = 23;
const BLACK_FRIDAY_LAST_DAY = 29;
const BLACK_FRIDAY_FACTOR = 3.4;
const OUTAGE_DAYS_AGO = 45;

const random = createSeededRandom(SEED);
const today = startOfDay(new Date());

export const DAILY_SALES_MOCK = Array.from({ length: HISTORY_DAYS }, (_, index): DailySales => {
  const daysAgo = HISTORY_DAYS - 1 - index;
  const date = subDays(today, daysAgo);
  const isBlackFriday =
    getMonth(date) === NOVEMBER &&
    getDay(date) === FRIDAY &&
    getDate(date) >= BLACK_FRIDAY_FIRST_DAY &&
    getDate(date) <= BLACK_FRIDAY_LAST_DAY;
  const factor =
    (1 + (index / HISTORY_DAYS) * TREND_GROWTH) *
    (WEEKDAY_FACTOR[getDay(date)] ?? 1) *
    (NOISE_MIN + random() * NOISE_RANGE) *
    (isBlackFriday ? BLACK_FRIDAY_FACTOR : 1);
  const orders = daysAgo === OUTAGE_DAYS_AGO ? 0 : Math.round(BASE_ORDERS * factor);
  const revenue = Math.round(orders * BASE_TICKET * (TICKET_MIN + random() * TICKET_RANGE) * CENTS) / CENTS;
  const unitsSold = Math.round(orders * (UNITS_PER_ORDER_MIN + random() * UNITS_PER_ORDER_RANGE));
  return {
    date: formatIsoDate(date),
    revenue,
    orders,
    profit: Math.round(revenue * (MARGIN_MIN + random() * MARGIN_RANGE) * CENTS) / CENTS,
    productsSold: Math.round(unitsSold * (DISTINCT_SKU_MIN + random() * DISTINCT_SKU_RANGE)),
    unitsSold,
    newCustomers: Math.round(orders * (NEW_CUSTOMERS_MIN + random() * NEW_CUSTOMERS_RANGE)),
    returningCustomers: Math.round(orders * (RETURNING_CUSTOMERS_MIN + random() * RETURNING_CUSTOMERS_RANGE)),
  };
}) satisfies DailySales[];
