"use client";

import { useState } from "react";

import type { StateCode } from "@/@types/Modules/VisaoGeral/Dashboard/sales-breakdown";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { INTENSITY_STEP_CLASSES } from "@/constants/Modules/Core/DesignSystem/intensity";
import { CHART_SKELETON_HEIGHT_PX, STATE_RANKING_LIMIT } from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";
import {
  BRAZIL_STATE_CODES,
  BRAZIL_STATE_NAMES,
  BRAZIL_STATE_TILES,
  STATE_GRID_COLUMNS,
} from "@/constants/Modules/VisaoGeral/Dashboard/states";
import { useSalesBreakdown } from "@/hooks/Modules/VisaoGeral/Dashboard/use-sales-breakdown";
import { formatNumber } from "@/lib/Modules/Core/DesignSystem/format-number";
import { getIntensityStep } from "@/lib/Modules/Core/DesignSystem/get-intensity-step";
import { getShare } from "@/lib/Modules/Core/DesignSystem/get-share";
import { cn } from "@/lib/utils";

import { CardError } from "../card-error";
import { CardSkeleton } from "../card-skeleton";
import { HighlightReadout } from "../highlight-readout";
import { IntensityLegend } from "../intensity-legend";
import { StateRankRow } from "../state-rank-row";
import { StateTile } from "../state-tile";

export function StatesCard() {
  const { data, isPending, isError, isPlaceholderData, refetch } = useSalesBreakdown();
  const [active, setActive] = useState<StateCode | null>(null);

  if (isPending) return <CardSkeleton height={CHART_SKELETON_HEIGHT_PX} />;
  if (isError) return <CardError title="Não foi possível carregar os estados" onRetry={() => refetch()} />;

  const byCode = new Map(data.states.map((state) => [state.code, state]));
  const total = data.states.reduce((sum, state) => sum + state.revenue, 0);
  const max = Math.max(0, ...data.states.map((state) => state.revenue));
  const ranking = [...data.states].sort((first, second) => second.revenue - first.revenue);
  const focusCode = active ?? ranking[0]?.code;
  const focus = focusCode ? byCode.get(focusCode) : undefined;
  const statesWithSales = data.states.filter((state) => state.orders > 0).length;

  return (
    <Card className={cn("h-full transition-opacity duration-200", isPlaceholderData && "opacity-60")}>
      <CardHeader>
        <CardTitle>Vendas por estado</CardTitle>
        <CardDescription>
          Faturamento por UF de entrega · {statesWithSales} de {BRAZIL_STATE_CODES.length} estados com vendas
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8 md:grid-cols-[minmax(0,22rem)_1fr]">
        <div className="flex flex-col gap-4">
          <HighlightReadout
            id={focusCode ?? "none"}
            title={`${active ? "" : "Líder · "}${focusCode ? BRAZIL_STATE_NAMES[focusCode] : ""}`}
            value={`${formatNumber(focus?.revenue ?? 0, "currency")} · ${formatNumber(focus?.orders ?? 0, "integer")} pedidos · ${formatNumber(getShare(focus?.revenue ?? 0, total), "percent")}`}
          />
          <div
            className="grid gap-1.5"
            style={{ gridTemplateColumns: `repeat(${STATE_GRID_COLUMNS}, minmax(0, 1fr))` }}
          >
            {BRAZIL_STATE_TILES.map((tile) => {
              const revenue = byCode.get(tile.code)?.revenue ?? 0;
              return (
                <StateTile
                  key={tile.code}
                  code={tile.code}
                  row={tile.row}
                  column={tile.column}
                  label={`${BRAZIL_STATE_NAMES[tile.code]}: ${formatNumber(revenue, "currency")}`}
                  step={getIntensityStep(revenue, max, INTENSITY_STEP_CLASSES.length)}
                  active={active === tile.code}
                  onActivate={() => setActive(tile.code)}
                  onDeactivate={() => setActive(null)}
                />
              );
            })}
          </div>
          <IntensityLegend />
        </div>
        <div className="min-w-0">
          <p className="mb-2 px-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            Ranking de estados
          </p>
          <ol>
            {ranking.slice(0, STATE_RANKING_LIMIT).map((state, index) => (
              <StateRankRow
                key={state.code}
                rank={index + 1}
                name={BRAZIL_STATE_NAMES[state.code]}
                value={formatNumber(state.revenue, "compactCurrency")}
                detail={`${formatNumber(state.orders, "integer")} pedidos · ${formatNumber(getShare(state.revenue, total), "percent")}`}
                share={state.revenue}
                maxShare={max}
                active={active === state.code}
                onActivate={() => setActive(state.code)}
                onDeactivate={() => setActive(null)}
              />
            ))}
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
