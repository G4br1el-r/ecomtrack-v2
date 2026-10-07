"use client";

import { type ChartConfig, EChartsBarChart } from "@/components/evilcharts/charts/echarts-bar-chart";
import { AnimatedNumber } from "@/components/Modules/Core/DesignSystem/animated-number";
import { VariationBadge } from "@/components/Modules/Core/DesignSystem/variation-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CHART_SKELETON_HEIGHT_PX,
  NEW_CUSTOMERS_LABEL,
  RETURNING_CUSTOMERS_LABEL,
} from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";
import { useDashboardOverview } from "@/hooks/Modules/VisaoGeral/Dashboard/use-dashboard-overview";
import { formatNumber } from "@/lib/Modules/Core/DesignSystem/format-number";
import { getShare } from "@/lib/Modules/Core/DesignSystem/get-share";
import { getVariation } from "@/lib/Modules/Core/DesignSystem/get-variation";
import { buildCustomerRows } from "@/lib/Modules/VisaoGeral/Dashboard/build-customer-rows";
import { cn } from "@/lib/utils";

import { CardSkeleton } from "../card-skeleton";

const CHART_CONFIG = {
  newCustomers: { label: NEW_CUSTOMERS_LABEL, colors: { light: ["var(--chart-1)"], dark: ["var(--chart-1)"] } },
  returningCustomers: {
    label: RETURNING_CUSTOMERS_LABEL,
    colors: { light: ["var(--chart-2)"], dark: ["var(--chart-2)"] },
  },
} satisfies ChartConfig;

export function CustomersCard() {
  const { data, isPlaceholderData } = useDashboardOverview();
  if (!data) return <CardSkeleton height={CHART_SKELETON_HEIGHT_PX} />;

  const { newCustomers, returningCustomers } = data.customers;
  const total = newCustomers.total + returningCustomers.total;
  const previousTotal = newCustomers.previousTotal + returningCustomers.previousTotal;
  const rows = buildCustomerRows(data);
  const segments = [
    { key: "new", label: NEW_CUSTOMERS_LABEL, value: newCustomers.total, className: "bg-chart-1" },
    { key: "returning", label: RETURNING_CUSTOMERS_LABEL, value: returningCustomers.total, className: "bg-chart-2" },
  ];

  return (
    <Card className={cn("h-full transition-opacity duration-200", isPlaceholderData && "opacity-60")}>
      <CardHeader>
        <CardTitle>Clientes no período</CardTitle>
        <CardDescription>Quem comprou pela primeira vez e quem voltou a comprar</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5">
        <div className="flex flex-wrap items-end gap-x-8 gap-y-3">
          <div className="space-y-1">
            <AnimatedNumber value={total} className="font-heading text-3xl leading-none font-semibold tracking-tight" />
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <VariationBadge value={getVariation(total, previousTotal)} />
              clientes únicos no período
            </div>
          </div>
          {segments.map((segment) => (
            <div key={segment.key} className="space-y-1">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span aria-hidden="true" className={cn("size-2.5 rounded-[3px]", segment.className)} />
                {segment.label}
              </p>
              <p className="text-lg font-semibold tabular-nums">
                {formatNumber(segment.value, "integer")}
                <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                  {formatNumber(getShare(segment.value, total), "percent")}
                </span>
              </p>
            </div>
          ))}
        </div>
        <div className="min-h-60 flex-1">
          {rows.length === 0 ? (
            <div className="grid h-full place-items-center text-sm text-muted-foreground">
              Nenhum cliente no período selecionado.
            </div>
          ) : (
            <EChartsBarChart
              data={rows}
              config={CHART_CONFIG}
              xDataKey="label"
              stackType="stacked"
              barRadius={4}
              className="h-full w-full"
            >
              <EChartsBarChart.Grid />
              <EChartsBarChart.XAxis dataKey="label" />
              <EChartsBarChart.YAxis />
              <EChartsBarChart.Tooltip
                variant="frosted-glass"
                valueFormatter={(value) => formatNumber(value, "integer")}
                labelFormatter={(label, index) => rows[index]?.title ?? label}
              />
              <EChartsBarChart.Bar dataKey="newCustomers" variant="gradient" enableHoverHighlight />
              <EChartsBarChart.Bar dataKey="returningCustomers" variant="gradient" enableHoverHighlight />
            </EChartsBarChart>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
