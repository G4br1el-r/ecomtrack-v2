import type { PipelineProduct } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-product";
import type { PipelineStage } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-stage";
import { SectionHeader } from "@/components/Modules/Core/DesignSystem/section-header";
import { StaggerReveal } from "@/components/Modules/Core/DesignSystem/stagger-reveal";
import { StaggerRevealItem } from "@/components/Modules/Core/DesignSystem/stagger-reveal-item";
import { PIPELINE_STAGES } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline";
import { REVEAL_TWEEN } from "@/constants/Modules/Core/DesignSystem/motion";

import { ImportTable } from "../import-table";
import { StageKpis } from "../stage-kpis";
import { StageTable } from "../stage-table";

export function StagePanel({
  stage,
  products,
  loading,
}: {
  stage: PipelineStage;
  products: PipelineProduct[];
  loading: boolean;
}) {
  const config = PIPELINE_STAGES[stage];
  return (
    <section role="tabpanel" aria-label={config.label} className="min-w-0">
      <StaggerReveal key={stage} className="flex min-w-0 flex-col gap-6">
        <StaggerRevealItem transition={REVEAL_TWEEN}>
          <SectionHeader title={config.label} description={config.description} />
        </StaggerRevealItem>
        <StaggerRevealItem transition={REVEAL_TWEEN}>
          <StageKpis stage={stage} products={products} loading={loading} />
        </StaggerRevealItem>
        <StaggerRevealItem transition={REVEAL_TWEEN} className="min-w-0">
          {stage === "importacao" ? (
            <ImportTable products={products} loading={loading} />
          ) : (
            <StageTable stage={stage} products={products} loading={loading} />
          )}
        </StaggerRevealItem>
      </StaggerReveal>
    </section>
  );
}
