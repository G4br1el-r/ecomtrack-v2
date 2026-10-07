"use client";

import { motion } from "motion/react";

import { AnimatedNumber } from "@/components/Modules/Core/DesignSystem/animated-number";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SPRING_SOFT } from "@/constants/Modules/Core/DesignSystem/motion";
import { PERCENT_SCALE } from "@/constants/Modules/Core/DesignSystem/number-format";
import { CHART_SKELETON_HEIGHT_PX } from "@/constants/Modules/VisaoGeral/Dashboard/dashboard";
import { ORDER_STATUSES } from "@/constants/Modules/VisaoGeral/Dashboard/order-statuses";
import { useSalesBreakdown } from "@/hooks/Modules/VisaoGeral/Dashboard/use-sales-breakdown";
import { formatNumber } from "@/lib/Modules/Core/DesignSystem/format-number";
import { getShare } from "@/lib/Modules/Core/DesignSystem/get-share";
import { cn } from "@/lib/utils";

import { BreakdownRow } from "../breakdown-row";
import { CardError } from "../card-error";
import { CardSkeleton } from "../card-skeleton";

export function OrderStatusCard() {
  const { data, isPending, isError, isPlaceholderData, refetch } = useSalesBreakdown();

  if (isPending) return <CardSkeleton height={CHART_SKELETON_HEIGHT_PX} />;
  if (isError) return <CardError title="Não foi possível carregar os status" onRetry={() => refetch()} />;

  const total = data.statuses.reduce((sum, status) => sum + status.orders, 0);

  return (
    <Card className={cn("h-full transition-opacity duration-200", isPlaceholderData && "opacity-60")}>
      <CardHeader>
        <CardTitle>Pedidos por status</CardTitle>
        <CardDescription>Situação atual dos pedidos feitos no período</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="space-y-1">
          <AnimatedNumber value={total} className="font-heading text-3xl leading-none font-semibold tracking-tight" />
          <p className="text-xs text-muted-foreground">pedidos no período</p>
        </div>
        <div className="flex h-3 w-full gap-0.5" role="img" aria-label="Distribuição dos pedidos por status">
          {total === 0 ? <div className="h-full w-full rounded-full bg-muted" /> : null}
          {data.statuses.map((status) =>
            status.orders === 0 ? null : (
              <motion.div
                key={status.id}
                className={cn("h-full first:rounded-l-full last:rounded-r-full", ORDER_STATUSES[status.id].dotClass)}
                initial={{ width: 0 }}
                animate={{ width: `${getShare(status.orders, total) * PERCENT_SCALE}%` }}
                transition={SPRING_SOFT}
              />
            ),
          )}
        </div>
        <ul className="-mx-2">
          {data.statuses.map((status) => (
            <BreakdownRow
              key={status.id}
              label={ORDER_STATUSES[status.id].label}
              value={formatNumber(status.orders, "integer")}
              detail={formatNumber(getShare(status.orders, total), "percent")}
              swatch={{ className: ORDER_STATUSES[status.id].dotClass }}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
