"use client";

import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Target } from "lucide-react";

import { type ChartConfig, EChartsRadialChart } from "@/components/evilcharts/charts/echarts-radial-chart";
import { AnimatedNumber } from "@/components/Modules/Core/DesignSystem/animated-number";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PERCENT_SCALE } from "@/constants/Modules/Core/DesignSystem/number-format";
import {
  GOAL_CHART_MAX,
  GOAL_MONTH_FORMAT,
  GOAL_SKELETON_HEIGHT_PX,
} from "@/constants/Modules/VisaoGeral/Dashboard/goal";
import { useMonthlyGoal } from "@/hooks/Modules/VisaoGeral/Dashboard/use-monthly-goal";
import { capitalize } from "@/lib/Modules/Core/DesignSystem/capitalize";
import { formatNumber } from "@/lib/Modules/Core/DesignSystem/format-number";
import { getShare } from "@/lib/Modules/Core/DesignSystem/get-share";
import { getMonthProjection } from "@/lib/Modules/VisaoGeral/Dashboard/get-month-projection";

import { CardError } from "../card-error";
import { CardSkeleton } from "../card-skeleton";
import { GoalStat } from "../goal-stat";

export function GoalCard() {
  const { data, isPending, isError, refetch } = useMonthlyGoal();

  if (isPending) return <CardSkeleton height={GOAL_SKELETON_HEIGHT_PX} />;
  if (isError) return <CardError title="Não foi possível carregar a meta" onRetry={() => refetch()} />;

  const progress = getShare(data.achieved, data.target);
  const projection = getMonthProjection(data);
  const onTrack = projection >= data.target;
  const remainingDays = data.daysInMonth - data.daysElapsed;
  const missing = Math.max(0, data.target - data.achieved);
  const chartConfig = {
    achieved: {
      label: "Realizado",
      colors: { light: ["var(--chart-1)", "var(--chart-3)"], dark: ["var(--chart-1)", "var(--chart-3)"] },
    },
  } satisfies ChartConfig;

  return (
    <Card className="h-full gap-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="size-4 text-primary" aria-hidden="true" />
          Meta de {capitalize(format(parseISO(data.month), GOAL_MONTH_FORMAT, { locale: ptBR }))}
        </CardTitle>
        <CardDescription>Faturamento do mês contra a meta</CardDescription>
        <CardAction>
          <Badge variant={onTrack ? "success" : "warning"}>{onTrack ? "No ritmo" : "Abaixo do ritmo"}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="relative mx-auto h-52 w-full max-w-80">
          <EChartsRadialChart
            data={[{ name: "achieved", value: Math.min(progress, 1) * GOAL_CHART_MAX }]}
            config={chartConfig}
            nameKey="name"
            variant="semi"
            max={GOAL_CHART_MAX}
            innerRadius="82%"
            outerRadius="104%"
            className="h-full w-full"
          >
            <EChartsRadialChart.RadialBar dataKey="value" cornerRadius={14} barSize={18} showBackground />
          </EChartsRadialChart>
          <div className="pointer-events-none absolute inset-x-0 top-[52%] flex flex-col items-center">
            <AnimatedNumber
              value={progress}
              kind="percent"
              className="font-heading text-5xl font-semibold tracking-tight"
            />
            <span className="text-xs text-muted-foreground">da meta atingida</span>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t pt-4">
          <GoalStat label="Realizado" value={formatNumber(data.achieved, "currency")} />
          <GoalStat label="Meta" value={formatNumber(data.target, "currency")} />
          <GoalStat
            label="Projeção de fechamento"
            value={formatNumber(projection, "currency")}
            hint={`${formatNumber(getShare(projection, data.target), "percent")} da meta`}
          />
          <GoalStat
            label="Necessário por dia"
            value={formatNumber(remainingDays > 0 ? missing / remainingDays : missing, "currency")}
            hint={`${remainingDays} dias restantes`}
          />
        </dl>
        <p className="sr-only">{`${Math.round(progress * PERCENT_SCALE)}% da meta atingida`}</p>
      </CardContent>
    </Card>
  );
}
