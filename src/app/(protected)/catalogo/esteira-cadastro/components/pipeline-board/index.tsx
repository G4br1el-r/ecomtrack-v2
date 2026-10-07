"use client";

import { useState } from "react";

import type { PipelineStage } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-stage";
import { Tabs } from "@/components/animate-ui/components/animate/tabs";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { DEFAULT_PIPELINE_STAGE } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline";
import { usePipelineProducts } from "@/hooks/Modules/Catalogo/EsteiraCadastro/use-pipeline-products";
import { countByStatus } from "@/lib/Modules/Catalogo/EsteiraCadastro/count-by-status";
import { filterByStage } from "@/lib/Modules/Catalogo/EsteiraCadastro/filter-by-stage";
import { isPipelineStage } from "@/lib/Modules/Catalogo/EsteiraCadastro/is-pipeline-stage";

import { ImportDetailSheet } from "../import-detail-sheet";
import { StagePanel } from "../stage-panel";
import { StageTabs } from "../stage-tabs";

export function PipelineBoard() {
  const { data = [], isPending, isError, refetch } = usePipelineProducts();
  const [stage, setStage] = useState<PipelineStage>(DEFAULT_PIPELINE_STAGE);

  if (isError) {
    return (
      <ErrorState
        title="Não foi possível carregar a esteira"
        description="Tente novamente em alguns instantes."
        onRetry={() => refetch()}
      />
    );
  }

  const counts = countByStatus(data);

  return (
    <Tabs
      value={stage}
      onValueChange={(value) => {
        if (isPipelineStage(value)) setStage(value);
      }}
      className="gap-8"
    >
      <StageTabs active={stage} counts={counts} loading={isPending} />
      <StagePanel stage={stage} products={filterByStage(data, stage)} loading={isPending} />
      <ImportDetailSheet />
    </Tabs>
  );
}
