"use client";

import { useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { INTENSITY_STEP_CLASSES, INTENSITY_STRONG_FROM_STEP } from "@/constants/Modules/Core/DesignSystem/intensity";
import { CHART_SKELETON_HEIGHT_PX } from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";
import {
  HEATMAP_WEEKDAY_ORDER,
  HOUR_LABEL_STEP,
  HOURS,
  WEEKDAY_LONG_LABELS,
  WEEKDAY_SHORT_LABELS,
} from "@/constants/Modules/VisaoGeral/Dashboard/heatmap";
import { useSalesBreakdown } from "@/hooks/Modules/VisaoGeral/Dashboard/use-sales-breakdown";
import { formatNumber } from "@/lib/Modules/Core/DesignSystem/format-number";
import { getIntensityStep } from "@/lib/Modules/Core/DesignSystem/get-intensity-step";
import { findPeakCell } from "@/lib/Modules/VisaoGeral/Dashboard/find-peak-cell";
import { cn } from "@/lib/utils";

import { CardError } from "../card-error";
import { CardSkeleton } from "../card-skeleton";
import { HighlightReadout } from "../highlight-readout";
import { IntensityLegend } from "../intensity-legend";

export function HourlyHeatmapCard() {
  const { data, isPending, isError, isPlaceholderData, refetch } = useSalesBreakdown();
  const [active, setActive] = useState<{ day: number; hour: number } | null>(null);

  if (isPending) return <CardSkeleton height={CHART_SKELETON_HEIGHT_PX} />;
  if (isError) return <CardError title="Não foi possível carregar o mapa de calor" onRetry={() => refetch()} />;

  const max = Math.max(0, ...data.hourly.flat());
  const peak = findPeakCell(data.hourly);
  const focus = active ?? peak;
  const focusValue = data.hourly[focus.day]?.[focus.hour] ?? 0;

  return (
    <Card className={cn("h-full transition-opacity duration-200", isPlaceholderData && "opacity-60")}>
      <CardHeader>
        <CardTitle>Quando a loja mais vende</CardTitle>
        <CardDescription>Pedidos por dia da semana e hora do dia</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <HighlightReadout
          id={`${focus.day}-${focus.hour}`}
          title={`${active ? "" : "Pico · "}${WEEKDAY_LONG_LABELS[focus.day]}, ${focus.hour}h às ${focus.hour + 1}h`}
          value={`${formatNumber(focusValue, "integer")} pedidos`}
        />
        <div className="overflow-x-auto pb-1">
          <div className="grid min-w-[36rem] grid-cols-[2.5rem_repeat(24,minmax(0,1fr))] gap-[3px]">
            {HEATMAP_WEEKDAY_ORDER.map((day) => (
              <div key={day} className="contents">
                <span className="self-center pr-1 text-[11px] text-muted-foreground">{WEEKDAY_SHORT_LABELS[day]}</span>
                {HOURS.map((hour) => {
                  const value = data.hourly[day]?.[hour] ?? 0;
                  const step = getIntensityStep(value, max, INTENSITY_STEP_CLASSES.length);
                  const isFocused = focus.day === day && focus.hour === hour;
                  return (
                    <button
                      key={hour}
                      type="button"
                      aria-label={`${WEEKDAY_LONG_LABELS[day]}, ${hour}h: ${formatNumber(value, "integer")} pedidos`}
                      onPointerEnter={() => setActive({ day, hour })}
                      onFocus={() => setActive({ day, hour })}
                      onPointerLeave={() => setActive(null)}
                      onBlur={() => setActive(null)}
                      className={cn(
                        "aspect-square rounded-[3px] transition-[transform,box-shadow] duration-150 outline-none hover:z-10 hover:scale-125 hover:ring-2 hover:ring-foreground/70 focus-visible:z-10 focus-visible:scale-125 focus-visible:ring-2 focus-visible:ring-ring active:scale-110",
                        INTENSITY_STEP_CLASSES[step],
                        isFocused && step >= INTENSITY_STRONG_FROM_STEP && "ring-2 ring-foreground/40",
                      )}
                    />
                  );
                })}
              </div>
            ))}
            <span />
            {HOURS.map((hour) => (
              <span key={hour} className="text-center text-[10px] text-muted-foreground tabular-nums">
                {hour % HOUR_LABEL_STEP === 0 ? `${hour}h` : ""}
              </span>
            ))}
          </div>
        </div>
        <IntensityLegend />
      </CardContent>
    </Card>
  );
}
