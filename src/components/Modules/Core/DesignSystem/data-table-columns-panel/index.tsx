"use client";

import { RotateCcw } from "lucide-react";
import { Reorder } from "motion/react";
import { useState } from "react";

import type {
  DataTableColumnDraftItem,
  DataTableColumnLayout,
  DataTableColumnOption,
} from "@/@types/Modules/Core/DesignSystem/data-table";
import { Button } from "@/components/ui/button";
import {
  DATA_TABLE_DEFAULT_COLUMN_LAYOUT,
  DATA_TABLE_POPOVER_SCROLL_CLASS,
} from "@/constants/Modules/Core/DesignSystem/data-table";
import { applyColumnsDraft } from "@/lib/Modules/Core/DesignSystem/apply-columns-draft";
import { buildColumnsDraft } from "@/lib/Modules/Core/DesignSystem/build-columns-draft";
import { moveItem } from "@/lib/Modules/Core/DesignSystem/move-item";
import { cn } from "@/lib/utils";

import { DataTableColumnsMenuItem } from "../data-table-columns-menu-item";

export function DataTableColumnsPanel({
  columns,
  layout,
  onApply,
  onCancel,
}: {
  columns: DataTableColumnOption[];
  layout: DataTableColumnLayout;
  onApply: (layout: DataTableColumnLayout) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<DataTableColumnDraftItem[]>(() => buildColumnsDraft(columns, layout));
  const hasVisibleColumn = draft.some((item) => item.visible);

  const updateItem = (id: string, patch: Partial<DataTableColumnDraftItem>) =>
    setDraft((current) => current.map((entry) => (entry.id === id ? { ...entry, ...patch } : entry)));

  return (
    <>
      <div className="flex items-center justify-between gap-2 px-4 pt-3 pb-1">
        <p className="text-xs text-muted-foreground">Arraste para reordenar e marque as que aparecem.</p>
        <Button
          variant="ghost"
          size="xs"
          className="-mr-2 shrink-0 text-muted-foreground hover:text-foreground"
          onClick={() => setDraft(buildColumnsDraft(columns, DATA_TABLE_DEFAULT_COLUMN_LAYOUT))}
        >
          <RotateCcw data-icon="inline-start" aria-hidden="true" />
          Restaurar padrão
        </Button>
      </div>
      <Reorder.Group
        axis="y"
        values={draft}
        onReorder={setDraft}
        layoutScroll
        className={cn("space-y-0.5 p-1.5", DATA_TABLE_POPOVER_SCROLL_CLASS)}
      >
        {draft.map((item, index) => (
          <DataTableColumnsMenuItem
            key={item.id}
            item={item}
            onVisibleChange={(visible) => updateItem(item.id, { visible })}
            onMove={(offset) => setDraft((current) => moveItem(current, index, index + offset))}
          />
        ))}
      </Reorder.Group>
      <div className="grid grid-cols-2 gap-2 border-t p-2">
        <Button variant="outline" size="sm" onClick={onCancel}>
          Cancelar
        </Button>
        <Button size="sm" disabled={!hasVisibleColumn} onClick={() => onApply(applyColumnsDraft(draft))}>
          Aplicar
        </Button>
      </div>
    </>
  );
}
