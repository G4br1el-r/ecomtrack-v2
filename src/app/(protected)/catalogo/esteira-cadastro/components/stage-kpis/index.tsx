"use client";

import type { PipelineProduct } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-product";
import type { PipelineStage } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-stage";
import { PIPELINE_STAGE_KPIS } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline-kpis";
import { countKpi } from "@/lib/Modules/Catalogo/EsteiraCadastro/count-kpi";

import { StageKpiCard } from "../stage-kpi-card";

export function StageKpis({
  stage,
  products,
  loading,
}: {
  stage: PipelineStage;
  products: PipelineProduct[];
  loading: boolean;
}) {
  const now = new Date();
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      {PIPELINE_STAGE_KPIS[stage].map((kpi) => (
        <StageKpiCard
          key={kpi.id}
          kpi={kpi}
          value={countKpi(products, kpi, now)}
          total={products.length}
          loading={loading}
        />
      ))}
    </div>
  );
}
