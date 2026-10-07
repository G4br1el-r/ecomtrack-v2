"use client";

import type { KpiPoint } from "@/@types/Modules/Core/DesignSystem/kpi";
import type { NumberFormatKind } from "@/@types/Modules/Core/DesignSystem/number-format";
import { type ChartConfig, EChartsAreaChart } from "@/components/evilcharts/charts/echarts-area-chart";
import { SPARKLINE_GRID, SPARKLINE_HEIGHT_PX } from "@/constants/Modules/Core/DesignSystem/ui";
import { formatNumber } from "@/lib/Modules/Core/DesignSystem/format-number";

export function Sparkline({
  data,
  color,
  label,
  kind = "integer",
}: {
  data: KpiPoint[];
  color: string;
  label: string;
  kind?: NumberFormatKind;
}) {
  const config = { value: { label, colors: { light: [color], dark: [color] } } } satisfies ChartConfig;
  return (
    <div style={{ height: SPARKLINE_HEIGHT_PX }} aria-hidden="true">
      <EChartsAreaChart
        data={data}
        config={config}
        xDataKey="label"
        curveType="monotone"
        className="h-full w-full"
        chartOptions={{ grid: SPARKLINE_GRID }}
      >
        <EChartsAreaChart.Tooltip
          variant="frosted-glass"
          cursor={false}
          valueFormatter={(value) => formatNumber(value, kind)}
        />
        <EChartsAreaChart.Area dataKey="value" variant="gradient" strokeVariant="solid" strokeWidth={1.5}>
          <EChartsAreaChart.ActiveDot variant="ping" />
        </EChartsAreaChart.Area>
      </EChartsAreaChart>
    </div>
  );
}
