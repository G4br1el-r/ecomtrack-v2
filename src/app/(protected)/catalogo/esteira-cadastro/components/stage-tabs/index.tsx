"use client";

import { LayoutGroup, motion } from "motion/react";

import type { PipelineStage } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-stage";
import type { PipelineStatus } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-status";
import { TabsList, TabsTrigger } from "@/components/animate-ui/primitives/animate/tabs";
import { AnimatedNumber } from "@/components/Modules/Core/DesignSystem/animated-number";
import { Skeleton } from "@/components/ui/skeleton";
import {
  PIPELINE_STAGE_IDS,
  PIPELINE_STAGES,
  STAGE_ICON_POP,
} from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline";
import {
  DURATION_SLOW,
  ENTER_OFFSET_Y,
  SPRING_SNAPPY,
  SPRING_SOFT,
  STAGGER_CHILDREN,
} from "@/constants/Modules/Core/DesignSystem/motion";
import { getStageCount } from "@/lib/Modules/Catalogo/EsteiraCadastro/get-stage-count";
import { cn } from "@/lib/utils";

export function StageTabs({
  active,
  counts,
  loading,
}: {
  active: PipelineStage;
  counts: Partial<Record<PipelineStatus, number>>;
  loading: boolean;
}) {
  return (
    <LayoutGroup id="pipeline-stage-tabs">
      <TabsList
        aria-label="Etapas da esteira"
        className="flex w-fit max-w-full gap-1 overflow-x-auto rounded-xl bg-muted p-1 [scrollbar-width:none]"
      >
        {PIPELINE_STAGE_IDS.map((id, index) => {
          const stage = PIPELINE_STAGES[id];
          const Icon = stage.icon;
          const selected = id === active;
          return (
            <TabsTrigger
              key={id}
              value={id}
              aria-selected={selected}
              initial={{ opacity: 0, y: ENTER_OFFSET_Y }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING_SOFT, delay: index * STAGGER_CHILDREN }}
              className={cn(
                "relative flex h-9 shrink-0 cursor-pointer items-center gap-2 rounded-lg px-3 text-sm font-medium outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring",
                selected ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {selected ? (
                <motion.span
                  aria-hidden="true"
                  layoutId="pipeline-stage-active"
                  transition={SPRING_SNAPPY}
                  className="absolute inset-0 rounded-lg bg-background shadow-sm"
                />
              ) : null}
              <motion.span
                key={selected ? "selected" : "idle"}
                className={cn("relative grid place-items-center", selected && "text-primary")}
                animate={selected ? STAGE_ICON_POP : undefined}
                transition={{ duration: DURATION_SLOW }}
              >
                <Icon className="size-4" aria-hidden="true" />
              </motion.span>
              <span className="relative">{stage.label}</span>
              {loading ? (
                <Skeleton className="relative h-5 w-7 rounded-md" />
              ) : (
                <span
                  className={cn(
                    "relative grid h-5 min-w-7 place-items-center rounded-md px-1.5 text-[11px] font-medium tabular-nums transition-colors duration-200",
                    selected ? "bg-primary text-primary-foreground" : "bg-background text-muted-foreground",
                  )}
                >
                  <AnimatedNumber value={getStageCount(counts, id)} />
                </span>
              )}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </LayoutGroup>
  );
}
