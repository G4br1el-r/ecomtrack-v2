"use client";

import { RotateCcw } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

import { FilterChip } from "@/components/Modules/Core/DesignSystem/filter-chip";
import { Button } from "@/components/ui/button";

import { ORDERS_FILTER_CHIPS } from "../../mocks/orders";

export function FilterChipsDemo() {
  const [chips, setChips] = useState(ORDERS_FILTER_CHIPS);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <AnimatePresence mode="popLayout">
        {chips.map((chip) => (
          <FilterChip
            key={chip}
            label={chip}
            onRemove={() => setChips((current) => current.filter((item) => item !== chip))}
          />
        ))}
        <FilterChip key="fixo" label="Loja: Principal" />
      </AnimatePresence>
      {chips.length < ORDERS_FILTER_CHIPS.length ? (
        <Button variant="ghost" size="xs" onClick={() => setChips(ORDERS_FILTER_CHIPS)}>
          <RotateCcw data-icon="inline-start" aria-hidden="true" />
          Restaurar
        </Button>
      ) : null}
    </div>
  );
}
