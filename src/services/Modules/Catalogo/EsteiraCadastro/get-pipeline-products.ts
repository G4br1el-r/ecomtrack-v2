import type { PipelineProduct } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-product";
import { MOCK_LATENCY_IN_MS } from "@/constants/Modules/Core/Shell/mock";
import { wait } from "@/lib/Modules/Core/Shell/wait";
import { PIPELINE_PRODUCTS_MOCK } from "@/mocks/Modules/Catalogo/EsteiraCadastro/pipeline-products";

export async function getPipelineProducts(): Promise<PipelineProduct[]> {
  await wait(MOCK_LATENCY_IN_MS);
  return PIPELINE_PRODUCTS_MOCK;
}
