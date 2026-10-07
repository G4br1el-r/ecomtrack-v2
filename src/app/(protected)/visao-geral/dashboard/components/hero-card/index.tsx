"use client";

import { AnimatePresence, motion } from "motion/react";

import { type ChartConfig, EChartsAreaChart } from "@/components/evilcharts/charts/echarts-area-chart";
import { AnimatedNumber } from "@/components/Modules/Core/DesignSystem/animated-number";
import { VariationBadge } from "@/components/Modules/Core/DesignSystem/variation-badge";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { ENTER_OFFSET_Y } from "@/constants/Modules/Core/DesignSystem/motion";
import { COMPACT_FORMAT_KIND } from "@/constants/Modules/Core/DesignSystem/number-format";
import {
  PREVIOUS_PERIOD_LABEL,
  PREVIOUS_SERIES_COLORS,
  VARIATION_LABEL,
} from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";
import { DASHBOARD_METRICS } from "@/constants/Modules/VisaoGeral/Dashboard/metrics";
import { useDashboardOverview } from "@/hooks/Modules/VisaoGeral/Dashboard/use-dashboard-overview";
import { formatNumber } from "@/lib/Modules/Core/DesignSystem/format-number";
import { getVariation } from "@/lib/Modules/Core/DesignSystem/get-variation";
import { buildComparisonRows } from "@/lib/Modules/VisaoGeral/Dashboard/build-comparison-rows";
import { cn } from "@/lib/utils";
import { useDashboardFiltersStore } from "@/store/Modules/VisaoGeral/Dashboard/dashboard-filters-store";

import { CardError } from "../card-error";
import { HeroCardSkeleton } from "../hero-card-skeleton";

export function HeroCard() {
  const { data, isPending, isError, isPlaceholderData, refetch } = useDashboardOverview();
  const metric = useDashboardFiltersStore((state) => state.metric);
  const compare = useDashboardFiltersStore((state) => state.compare);

  if (isPending) return <HeroCardSkeleton />;
  if (isError) return <CardError title="Não foi possível carregar os indicadores" onRetry={() => refetch()} />;

  const config = DASHBOARD_METRICS[metric];
  const summary = data.metrics[metric];
  const rows = buildComparisonRows(data, metric);
  const Icon = config.icon;
  const chartConfig = {
    current: { label: config.title, colors: { light: ["var(--primary)"], dark: ["var(--primary)"] } },
    previous: {
      label: PREVIOUS_PERIOD_LABEL,
      colors: PREVIOUS_SERIES_COLORS,
    },
  } satisfies ChartConfig;

  return (
    <Card className="relative isolate h-full gap-2 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_0%_0%,color-mix(in_oklch,var(--primary)_16%,transparent),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] mask-[linear-gradient(to_bottom,black,transparent_65%)] bg-size-[18px_18px]"
      />
      <CardHeader className="gap-3">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={metric}
            initial={{ opacity: 0, y: ENTER_OFFSET_Y }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -ENTER_OFFSET_Y }}
            className="flex items-center gap-2.5"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-primary/12 text-primary ring-1 ring-primary/20">
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">{config.title}</p>
              <CardDescription className="text-xs">{config.description}</CardDescription>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
          <AnimatedNumber
            value={summary.total}
            kind={config.kind}
            className="font-heading text-4xl leading-none font-semibold tracking-tight sm:text-5xl"
          />
          <div className="flex items-center gap-2 pb-1 text-sm text-muted-foreground">
            <VariationBadge value={getVariation(summary.total, summary.previousTotal)} />
            <span>{VARIATION_LABEL}</span>
            {compare ? (
              <span className="hidden font-medium text-foreground tabular-nums sm:inline">
                ({formatNumber(summary.previousTotal, config.kind)})
              </span>
            ) : null}
          </div>
        </div>
      </CardHeader>
      <CardContent
        className={cn("h-72 px-2 transition-opacity duration-200 sm:h-80", isPlaceholderData && "opacity-50")}
      >
        {rows.length === 0 ? (
          <div className="grid h-full place-items-center text-sm text-muted-foreground">
            Sem vendas no período selecionado.
          </div>
        ) : (
          <EChartsAreaChart
            data={rows}
            config={chartConfig}
            xDataKey="label"
            curveType="monotone"
            enableHoverReveal
            className="h-full w-full"
          >
            <EChartsAreaChart.Grid />
            <EChartsAreaChart.XAxis dataKey="label" />
            <EChartsAreaChart.YAxis tickFormatter={(value) => formatNumber(value, COMPACT_FORMAT_KIND[config.kind])} />
            <EChartsAreaChart.Tooltip
              variant="frosted-glass"
              valueFormatter={(value) => formatNumber(value, config.kind)}
              labelFormatter={(label, index) => rows[index]?.title ?? label}
            />
            {compare ? (
              <EChartsAreaChart.Area dataKey="previous" variant="none" strokeVariant="dashed" strokeWidth={1.5} />
            ) : null}
            <EChartsAreaChart.Area dataKey="current" variant="gradient" strokeVariant="solid" strokeWidth={2.5}>
              <EChartsAreaChart.ActiveDot variant="ping" />
            </EChartsAreaChart.Area>
          </EChartsAreaChart>
        )}
      </CardContent>
    </Card>
  );
}
