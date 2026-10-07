import * as motion from "motion/react-client";

import type { Kpi } from "@/@types/Modules/Core/DesignSystem/kpi";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { SPRING_SNAPPY } from "@/constants/Modules/Core/DesignSystem/motion";
import { cn } from "@/lib/utils";

import { AnimatedNumber } from "../animated-number";
import { Sparkline } from "../sparkline";
import { VariationBadge } from "../variation-badge";

export function KpiCard({
  kpi,
  icon,
  selected = false,
  onSelect,
}: {
  kpi: Kpi;
  icon?: React.ReactNode;
  selected?: boolean;
  onSelect?: () => void;
}) {
  const positive = kpi.change === null || kpi.change >= 0;
  const card = (
    <Card
      className={cn(
        "h-full gap-3 pb-0 transition-[box-shadow,background-color] duration-200",
        onSelect && "group-hover/kpi:bg-accent/40 group-hover/kpi:shadow-card",
        selected && "bg-primary/[0.03]",
      )}
    >
      <CardHeader className="gap-1.5">
        <CardDescription className={cn("flex items-center gap-1.5", selected && "text-foreground")}>
          {icon}
          {kpi.title}
        </CardDescription>
        <div className="flex items-center justify-between gap-2">
          <AnimatedNumber
            value={kpi.value}
            kind={kpi.kind}
            className="truncate font-heading text-2xl font-semibold tracking-tight"
          />
          <VariationBadge value={kpi.change} />
        </div>
      </CardHeader>
      <CardContent className="mt-auto px-0">
        <Sparkline
          data={kpi.series}
          label={kpi.title}
          kind={kpi.kind}
          color={positive ? "var(--success)" : "var(--destructive)"}
        />
      </CardContent>
    </Card>
  );

  if (!onSelect) return card;

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className="group/kpi relative block h-full w-full rounded-xl text-left outline-none transition-transform duration-150 hover:-translate-y-0.5 focus-visible:ring-[3px] focus-visible:ring-ring/50 active:translate-y-0"
    >
      {card}
      {selected ? (
        <motion.span
          layoutId="kpi-card-selected"
          transition={SPRING_SNAPPY}
          className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-primary shadow-[0_0_24px_-6px_var(--primary)]"
        />
      ) : null}
    </button>
  );
}
