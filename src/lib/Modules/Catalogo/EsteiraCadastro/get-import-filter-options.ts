import type { ImportAvailability } from "@/@types/Modules/Catalogo/EsteiraCadastro/import-filters";
import type { PipelineProduct, Supplier } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-product";
import type { ComboboxOption } from "@/@types/Modules/Core/DesignSystem/combobox";
import {
  IMPORT_AVAILABILITY_LABEL,
  IMPORT_AVAILABILITY_VALUES,
} from "@/constants/Modules/Catalogo/EsteiraCadastro/import-filters";
import { SUPPLIER_LABEL } from "@/constants/Modules/Catalogo/EsteiraCadastro/pipeline";

export function getImportFilterOptions(products: PipelineProduct[]): {
  availability: ComboboxOption<ImportAvailability>[];
  suppliers: ComboboxOption<Supplier>[];
  categories: ComboboxOption[];
} {
  const byLabel = (first: ComboboxOption, second: ComboboxOption) => first.label.localeCompare(second.label);
  return {
    availability: IMPORT_AVAILABILITY_VALUES.map((value) => ({ value, label: IMPORT_AVAILABILITY_LABEL[value] })),
    suppliers: [...new Set(products.map((product) => product.supplier))]
      .map((value) => ({ value, label: SUPPLIER_LABEL[value] }))
      .sort(byLabel),
    categories: [...new Set(products.map((product) => product.supplierCategory))]
      .map((value) => ({ value, label: value }))
      .sort(byLabel),
  };
}
