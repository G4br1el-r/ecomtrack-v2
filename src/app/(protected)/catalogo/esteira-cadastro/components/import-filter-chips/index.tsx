"use client";

import { AnimatePresence, motion } from "motion/react";

import { FilterChip } from "@/components/Modules/Core/DesignSystem/filter-chip";
import { Button } from "@/components/ui/button";
import { SPRING_SNAPPY } from "@/constants/Modules/Core/DesignSystem/motion";
import { countActiveImportFilters } from "@/lib/Modules/Catalogo/EsteiraCadastro/count-active-import-filters";
import { getImportFilterChips } from "@/lib/Modules/Catalogo/EsteiraCadastro/get-import-filter-chips";
import { useImportFiltersStore } from "@/store/Modules/Catalogo/EsteiraCadastro/import-filters-store";

export function ImportFilterChips() {
  const filters = useImportFiltersStore((state) => state.filters);
  const setFilters = useImportFiltersStore((state) => state.setFilters);
  const resetFilters = useImportFiltersStore((state) => state.resetFilters);
  const clearable = filters.showIgnored || countActiveImportFilters(filters) > 0;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <AnimatePresence initial={false} mode="popLayout">
        {getImportFilterChips(filters).map((chip) => {
          const next = chip.next;
          return (
            <FilterChip
              key={chip.id}
              field={chip.field}
              label={chip.label}
              onRemove={next ? () => setFilters(next) : undefined}
            />
          );
        })}
        {clearable ? (
          <motion.span
            key="clear"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={SPRING_SNAPPY}
          >
            <Button variant="link" size="xs" className="text-muted-foreground" onClick={resetFilters}>
              Limpar filtros
            </Button>
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
