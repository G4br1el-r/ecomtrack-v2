import type { PipelineStage } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-stage";
import type { PipelineStatus } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-status";
import { PIPELINE_STAGES } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline";

export function getStageCount(counts: Partial<Record<PipelineStatus, number>>, stage: PipelineStage): number {
  return PIPELINE_STAGES[stage].statuses.reduce((total, status) => total + (counts[status] ?? 0), 0);
}
