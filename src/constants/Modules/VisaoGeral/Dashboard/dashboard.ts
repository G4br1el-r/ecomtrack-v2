import type { PeriodPresetId } from "@/@types/Modules/Core/DesignSystem/date-range";
import type { SalesTotals } from "@/@types/Modules/VisaoGeral/Dashboard/sales-measure";

export const DEFAULT_DASHBOARD_PERIOD: PeriodPresetId = "ultimos-30";

export const DASHBOARD_QUERY_KEY = ["visao-geral", "dashboard"] as const;
export const DASHBOARD_OVERVIEW_QUERY_KEY = [...DASHBOARD_QUERY_KEY, "overview"] as const;
export const DASHBOARD_BREAKDOWN_QUERY_KEY = [...DASHBOARD_QUERY_KEY, "breakdown"] as const;
export const DASHBOARD_TOP_PRODUCTS_QUERY_KEY = [...DASHBOARD_QUERY_KEY, "top-products"] as const;
export const DASHBOARD_GOAL_QUERY_KEY = [...DASHBOARD_QUERY_KEY, "goal"] as const;

export const TOP_PRODUCTS_LIMIT = 10;
export const STATE_RANKING_LIMIT = 8;

export const PREVIOUS_PERIOD_LABEL = "Período anterior";
export const VARIATION_LABEL = "vs. período anterior";
export const NEW_CUSTOMERS_LABEL = "Novos";
export const RETURNING_CUSTOMERS_LABEL = "Recorrentes";

export const EMPTY_SALES_TOTALS: SalesTotals = {
  revenue: 0,
  orders: 0,
  averageTicket: 0,
  profit: 0,
  productsSold: 0,
  unitsSold: 0,
  newCustomers: 0,
  returningCustomers: 0,
};

export const CHART_SKELETON_HEIGHT_PX = 240;
export const COMPACT_CHART_HEIGHT_CLASS = "h-60";

export const PREVIOUS_SERIES_COLORS = {
  light: ["color-mix(in oklch, var(--muted-foreground) 55%, transparent)"],
  dark: ["color-mix(in oklch, var(--muted-foreground) 70%, transparent)"],
};
