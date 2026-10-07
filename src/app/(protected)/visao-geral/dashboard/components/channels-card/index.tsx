"use client";

import { type ChartConfig, EChartsPieChart } from "@/components/evilcharts/charts/echarts-pie-chart";
import { AnimatedNumber } from "@/components/Modules/Core/DesignSystem/animated-number";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CHANNEL_IDS, CHANNELS } from "@/constants/Modules/VisaoGeral/Dashboard/channels";
import { CHART_SKELETON_HEIGHT_PX } from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";
import { useSalesBreakdown } from "@/hooks/Modules/VisaoGeral/Dashboard/use-sales-breakdown";
import { formatNumber } from "@/lib/Modules/Core/DesignSystem/format-number";
import { getShare } from "@/lib/Modules/Core/DesignSystem/get-share";
import { cn } from "@/lib/utils";

import { BreakdownRow } from "../breakdown-row";
import { CardError } from "../card-error";
import { CardSkeleton } from "../card-skeleton";

const CHART_CONFIG = Object.fromEntries(
  CHANNEL_IDS.map((id) => [
    id,
    { label: CHANNELS[id].label, colors: { light: [CHANNELS[id].color], dark: [CHANNELS[id].color] } },
  ]),
) satisfies ChartConfig;

export function ChannelsCard() {
  const { data, isPending, isError, isPlaceholderData, refetch } = useSalesBreakdown();

  if (isPending) return <CardSkeleton height={CHART_SKELETON_HEIGHT_PX} />;
  if (isError) return <CardError title="Não foi possível carregar os canais" onRetry={() => refetch()} />;

  const total = data.channels.reduce((sum, channel) => sum + channel.revenue, 0);

  return (
    <Card className={cn("h-full transition-opacity duration-200", isPlaceholderData && "opacity-60")}>
      <CardHeader>
        <CardTitle>Vendas por canal</CardTitle>
        <CardDescription>Participação de cada canal no faturamento</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="relative aspect-square w-full max-w-52 shrink-0">
          <EChartsPieChart
            data={data.channels}
            config={CHART_CONFIG}
            dataKey="revenue"
            nameKey="id"
            className="h-full w-full"
          >
            <EChartsPieChart.Tooltip
              variant="frosted-glass"
              valueFormatter={(value) => formatNumber(value, "currency")}
            />
            <EChartsPieChart.Pie innerRadius="64%" outerRadius="94%" paddingAngle={4} cornerRadius={10} />
          </EChartsPieChart>
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="flex aspect-square w-[58%] flex-col items-center justify-center rounded-full border border-dashed text-center">
              <AnimatedNumber value={total} kind="compactCurrency" className="text-xl font-semibold tracking-tight" />
              <span className="text-xs text-muted-foreground">faturamento</span>
            </div>
          </div>
        </div>
        <ul className="w-full min-w-0 flex-1">
          {[...data.channels]
            .sort((first, second) => second.revenue - first.revenue)
            .map((channel) => (
              <BreakdownRow
                key={channel.id}
                label={CHANNELS[channel.id].label}
                value={formatNumber(channel.revenue, "compactCurrency")}
                detail={formatNumber(getShare(channel.revenue, total), "percent")}
                swatch={{ color: CHANNELS[channel.id].color }}
              />
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}
