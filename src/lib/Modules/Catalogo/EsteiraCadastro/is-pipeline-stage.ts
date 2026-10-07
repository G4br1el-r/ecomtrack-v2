import type { PipelineStage } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-stage";
import { PIPELINE_STAGE_IDS } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline";

export function isPipelineStage(value: string): value is PipelineStage {
  return PIPELINE_STAGE_IDS.some((stage) => stage === value);
}
