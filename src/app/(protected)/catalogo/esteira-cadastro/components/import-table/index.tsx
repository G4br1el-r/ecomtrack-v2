"use client";

import { ClipboardPlus, EyeOff, RotateCcw } from "lucide-react";

import type { PipelineProduct } from "@/@types/Modules/Catalogo/EsteiraCadastro/pipeline-product";
import { EmptyState } from "@/components/Modules/Core/DesignSystem/empty-state";
import { Button } from "@/components/ui/button";
import { countActiveImportFilters } from "@/lib/Modules/Catalogo/EsteiraCadastro/count-active-import-filters";
import { filterImportProducts } from "@/lib/Modules/Catalogo/EsteiraCadastro/filter-import-products";
import { useImportFiltersStore } from "@/store/Modules/Catalogo/EsteiraCadastro/import-filters-store";

import { ExchangeRates } from "../exchange-rates";
import { IgnoredToggle } from "../ignored-toggle";
import { ImportFilterChips } from "../import-filter-chips";
import { ImportFiltersSheet } from "../import-filters-sheet";
import { StageTable } from "../stage-table";

export function ImportTable({ products, loading }: { products: PipelineProduct[]; loading: boolean }) {
  const filters = useImportFiltersStore((state) => state.filters);
  const setFilters = useImportFiltersStore((state) => state.setFilters);
  const resetFilters = useImportFiltersStore((state) => state.resetFilters);
  const ignoredCount = products.filter((product) => product.status === "ignorado").length;
  const filtered = countActiveImportFilters(filters) > 0;

  return (
    <StageTable
      key={filters.showIgnored ? "ignorados" : "importados"}
      stage="importacao"
      products={filterImportProducts(products, filters)}
      loading={loading}
      toolbar={{
        start: (
          <>
            <ImportFiltersSheet products={products} />
            <IgnoredToggle
              count={ignoredCount}
              pressed={filters.showIgnored}
              onPressedChange={(showIgnored) => setFilters({ ...filters, showIgnored })}
            />
          </>
        ),
        end: <ExchangeRates />,
        below: <ImportFilterChips />,
      }}
      empty={
        filters.showIgnored && !filtered ? (
          <EmptyState title="Nenhum produto ignorado" description="Os produtos que você ignorar aparecem aqui." />
        ) : filtered ? (
          <EmptyState
            title="Nenhum produto com esses filtros"
            description="Ajuste ou limpe os filtros para ver mais produtos."
            action={
              <Button variant="outline" onClick={resetFilters}>
                <RotateCcw data-icon="inline-start" aria-hidden="true" />
                Limpar filtros
              </Button>
            }
          />
        ) : undefined
      }
      bulkActions={
        filters.showIgnored ? (
          <Button variant="ghost" size="sm">
            <RotateCcw data-icon="inline-start" aria-hidden="true" />
            Reativar
          </Button>
        ) : (
          <>
            <Button variant="ghost" size="sm">
              <ClipboardPlus data-icon="inline-start" aria-hidden="true" />
              Cadastrar
            </Button>
            <Button variant="ghost" size="sm">
              <EyeOff data-icon="inline-start" aria-hidden="true" />
              Ignorar
            </Button>
          </>
        )
      }
    />
  );
}
