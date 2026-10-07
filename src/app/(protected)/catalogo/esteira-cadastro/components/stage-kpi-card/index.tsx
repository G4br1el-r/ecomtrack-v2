"use client";

import type { StageKpiConfig } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-stage";
import { AnimatedNumber } from "@/components/Modules/Core/DesignSystem/animated-number";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { KPI_TONE_CLASS } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline-kpis";
import { formatNumber } from "@/lib/Modules/Core/DesignSystem/format-number";
import { getShare } from "@/lib/Modules/Core/DesignSystem/get-share";
import { cn } from "@/lib/utils";

export function StageKpiCard({
  kpi,
  value,
  total,
  loading,
}: {
  kpi: StageKpiConfig;
  value: number;
  total: number;
  loading: boolean;
}) {
  const Icon = kpi.icon;
  const share = getShare(value, total);
  return (
    <Card className="min-w-0 flex-1 gap-3 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="truncate text-sm font-medium text-muted-foreground">{kpi.label}</p>
          {loading ? (
            <Skeleton className="h-8 w-14" />
          ) : (
            <p className="flex items-baseline gap-2">
              <AnimatedNumber value={value} className="font-heading text-2xl leading-8 font-semibold tracking-tight" />
              <span className="text-xs text-muted-foreground tabular-nums">
                {formatNumber(share, "percent")} da etapa
              </span>
            </p>
          )}
        </div>
        <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg", KPI_TONE_CLASS[kpi.tone])}>
          <Icon className="size-4.5" aria-hidden="true" />
        </span>
      </div>
      <p className="mt-auto text-xs text-muted-foreground">{kpi.hint}</p>
    </Card>
  );
}
