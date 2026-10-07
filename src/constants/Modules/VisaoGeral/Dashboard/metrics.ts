import { Boxes, DollarSign, Package, Receipt, ShoppingCart, TrendingUp } from "lucide-react";

import type { DashboardMetricConfig, DashboardMetricId } from "@/@types/Modules/VisaoGeral/Dashboard/dashboard-metric";

export const DASHBOARD_METRIC_IDS = [
  "revenue",
  "orders",
  "averageTicket",
  "profit",
  "productsSold",
  "unitsSold",
] as const;

export const DASHBOARD_METRICS = {
  revenue: { title: "Faturamento", description: "Receita total no período", kind: "currency", icon: DollarSign },
  orders: { title: "Pedidos", description: "Total de pedidos realizados", kind: "integer", icon: ShoppingCart },
  averageTicket: {
    title: "Ticket médio",
    description: "Faturamento dividido pelo número de pedidos",
    kind: "currency",
    icon: Receipt,
  },
  profit: {
    title: "Lucro estimado",
    description: "Faturamento menos o custo dos produtos",
    kind: "currency",
    icon: TrendingUp,
  },
  productsSold: { title: "Produtos vendidos", description: "SKUs distintos vendidos", kind: "integer", icon: Package },
  unitsSold: { title: "Unidades vendidas", description: "Total de unidades expedidas", kind: "integer", icon: Boxes },
} as const satisfies Record<DashboardMetricId, DashboardMetricConfig>;

export const DEFAULT_DASHBOARD_METRIC: DashboardMetricId = "revenue";
