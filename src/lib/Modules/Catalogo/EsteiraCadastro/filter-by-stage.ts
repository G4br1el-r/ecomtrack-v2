import type { PipelineProduct } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-product";
import type { PipelineStage } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-stage";
import { PIPELINE_STAGES } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline";

export function filterByStage(products: PipelineProduct[], stage: PipelineStage): PipelineProduct[] {
  const statuses = PIPELINE_STAGES[stage].statuses;
  return products.filter((product) => statuses.includes(product.status));
}
