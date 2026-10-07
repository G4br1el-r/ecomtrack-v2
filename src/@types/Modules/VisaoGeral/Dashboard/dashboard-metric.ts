import type { LucideIcon } from "lucide-react";

import type { Kpi } from "@/@types/Modules/Core/DesignSystem/kpi";
import type { NumberFormatKind } from "@/@types/Modules/Core/DesignSystem/number-format";
import type { DASHBOARD_METRIC_IDS } from "@/constants/Modules/VisaoGeral/Dashboard/metrics";

export type DashboardMetricId = (typeof DASHBOARD_METRIC_IDS)[number];

export type DashboardMetricConfig = {
  title: string;
  description: string;
  kind: NumberFormatKind;
  icon: LucideIcon;
};

export type DashboardKpi = Kpi & { id: DashboardMetricId };
