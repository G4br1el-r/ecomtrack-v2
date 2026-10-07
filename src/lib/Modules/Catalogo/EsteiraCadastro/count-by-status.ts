import type { PipelineProduct } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-product";
import type { PipelineStatus } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-status";

export function countByStatus(products: PipelineProduct[]): Partial<Record<PipelineStatus, number>> {
  const counts: Partial<Record<PipelineStatus, number>> = {};
  for (const product of products) {
    counts[product.status] = (counts[product.status] ?? 0) + 1;
  }
  return counts;
}
