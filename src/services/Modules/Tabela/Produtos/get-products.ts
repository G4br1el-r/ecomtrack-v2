import type { Product } from "@/@types/Modules/Tabela/Produtos/product";
import { MOCK_LATENCY_IN_MS } from "@/constants/Modules/Core/Shell/mock";
import { wait } from "@/lib/Modules/Core/Shell/wait";
import { PRODUCTS_MOCK } from "@/mocks/Modules/Tabela/Produtos/products";

export async function getProducts(): Promise<Product[]> {
  await wait(MOCK_LATENCY_IN_MS);
  return PRODUCTS_MOCK;
}
