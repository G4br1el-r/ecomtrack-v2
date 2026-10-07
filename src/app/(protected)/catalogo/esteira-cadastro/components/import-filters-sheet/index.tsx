"use client";

import { useId, useState } from "react";

import type { ImportFilters } from "@/@types/Modules/Catalogo/EsteiraCadastro/import-filters";
import type { PipelineProduct } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-product";
import { Combobox } from "@/components/Modules/Core/DesignSystem/combobox";
import { FilterSection } from "@/components/Modules/Core/DesignSystem/filter-section";
import { FilterSheet } from "@/components/Modules/Core/DesignSystem/filter-sheet";
import { MultiCombobox } from "@/components/Modules/Core/DesignSystem/multi-combobox";
import { DEFAULT_IMPORT_FILTERS } from "@/constants/Modules/Catalogo/EsteiraCadastro/import-filters";
import { countActiveImportFilters } from "@/lib/Modules/Catalogo/EsteiraCadastro/count-active-import-filters";
import { filterImportProducts } from "@/lib/Modules/Catalogo/EsteiraCadastro/filter-import-products";
import { getImportFilterOptions } from "@/lib/Modules/Catalogo/EsteiraCadastro/get-import-filter-options";
import { formatNumber } from "@/lib/Modules/Core/DesignSystem/format-number";
import { useImportFiltersStore } from "@/store/Modules/Catalogo/EsteiraCadastro/import-filters-store";

export function ImportFiltersSheet({ products }: { products: PipelineProduct[] }) {
  const idPrefix = useId();
  const filters = useImportFiltersStore((state) => state.filters);
  const setFilters = useImportFiltersStore((state) => state.setFilters);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<ImportFilters>(filters);
  const options = getImportFilterOptions(
    filterImportProducts(products, {
      ...DEFAULT_IMPORT_FILTERS,
      availability: "todas",
      showIgnored: draft.showIgnored,
    }),
  );
  const resultCount = filterImportProducts(products, draft).length;
  const patchDraft = (patch: Partial<ImportFilters>) => setDraft((current) => ({ ...current, ...patch }));

  return (
    <FilterSheet
      open={open}
      onOpenChange={(next) => {
        if (next) setDraft(filters);
        setOpen(next);
      }}
      activeCount={countActiveImportFilters(filters)}
      clearableCount={countActiveImportFilters(draft)}
      onClear={() => setDraft({ ...DEFAULT_IMPORT_FILTERS, showIgnored: draft.showIgnored })}
      description={
        draft.showIgnored ? "Refine a lista de produtos ignorados." : "Refine os produtos importados dos fornecedores."
      }
      onApply={() => {
        setFilters(draft);
        setOpen(false);
      }}
      applyLabel={`Mostrar ${formatNumber(resultCount, "integer")} ${resultCount === 1 ? "produto" : "produtos"}`}
    >
      <FilterSection
        title="Disponibilidade"
        htmlFor={`${idPrefix}-availability`}
        description="Estoque informado pelo fornecedor na última sincronização."
      >
        <Combobox
          id={`${idPrefix}-availability`}
          label="Disponibilidade"
          searchPlaceholder="Buscar disponibilidade..."
          options={options.availability}
          value={draft.availability}
          onValueChange={(availability) => patchDraft({ availability })}
          className="h-9 w-full border-input font-normal"
        />
      </FilterSection>
      <FilterSection
        title="Fornecedor"
        htmlFor={`${idPrefix}-supplier`}
        description="Nenhum marcado mostra todos."
        selectedCount={draft.suppliers.length}
        onClear={() => patchDraft({ suppliers: [] })}
      >
        <MultiCombobox
          id={`${idPrefix}-supplier`}
          label="Fornecedor"
          placeholder="Todos os fornecedores"
          searchPlaceholder="Buscar fornecedor..."
          emptyText="Nenhum fornecedor encontrado."
          options={options.suppliers}
          value={draft.suppliers}
          onValueChange={(suppliers) => patchDraft({ suppliers })}
        />
      </FilterSection>
      <FilterSection
        title="Categoria"
        htmlFor={`${idPrefix}-category`}
        description="Categoria informada pelo fornecedor."
        selectedCount={draft.categories.length}
        onClear={() => patchDraft({ categories: [] })}
      >
        <MultiCombobox
          id={`${idPrefix}-category`}
          label="Categoria"
          placeholder="Todas as categorias"
          searchPlaceholder="Buscar categoria..."
          emptyText="Nenhuma categoria encontrada."
          options={options.categories}
          value={draft.categories}
          onValueChange={(categories) => patchDraft({ categories })}
        />
      </FilterSection>
    </FilterSheet>
  );
}
