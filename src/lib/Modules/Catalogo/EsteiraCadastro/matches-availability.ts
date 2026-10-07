import type { ImportAvailability } from "@/@types/Modules/Catalogo/EsteiraCadastro/import-filters";
import type { PipelineProduct } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-product";
import { OUT_OF_STOCK_QUANTITY } from "@/constants/Modules/Catalogo/EsteiraCadastro/import-filters";

export function matchesAvailability(product: PipelineProduct, availability: ImportAvailability): boolean {
  if (availability === "todas") return true;
  return (availability === "disponivel") === product.stock > OUT_OF_STOCK_QUANTITY;
}
