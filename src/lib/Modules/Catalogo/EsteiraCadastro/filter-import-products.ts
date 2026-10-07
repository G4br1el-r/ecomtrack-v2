import type { ImportFilters } from "@/@types/Modules/Catalogo/EsteiraCadastro/import-filters";
import type { PipelineProduct } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-product";

import { matchesAvailability } from "./matches-availability";

export function filterImportProducts(products: PipelineProduct[], filters: ImportFilters): PipelineProduct[] {
  return products.filter(
    (product) =>
      (product.status === "ignorado") === filters.showIgnored &&
      (filters.suppliers.length === 0 || filters.suppliers.includes(product.supplier)) &&
      (filters.categories.length === 0 || filters.categories.includes(product.supplierCategory)) &&
      matchesAvailability(product, filters.availability),
  );
}
