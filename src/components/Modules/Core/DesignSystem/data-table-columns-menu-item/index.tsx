"use client";

import { GripVertical } from "lucide-react";
import { Reorder } from "motion/react";

import type { DataTableColumnDraftItem } from "@/@types/Modules/Core/DesignSystem/data-table";
import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";
import { DATA_TABLE_REORDER_STEP } from "@/constants/Modules/Core/DesignSystem/data-table";
import { DRAG_SCALE, SPRING_SNAPPY } from "@/constants/Modules/Core/DesignSystem/motion";

export function DataTableColumnsMenuItem({
  item,
  onVisibleChange,
  onMove,
}: {
  item: DataTableColumnDraftItem;
  onVisibleChange: (visible: boolean) => void;
  onMove: (offset: number) => void;
}) {
  return (
    <Reorder.Item
      value={item}
      whileDrag={{ scale: DRAG_SCALE, cursor: "grabbing" }}
      transition={SPRING_SNAPPY}
      className="relative flex cursor-grab items-center gap-2 rounded-md bg-popover py-0.5 pr-1 pl-0.5 transition-colors select-none hover:bg-muted active:cursor-grabbing"
    >
      <button
        type="button"
        aria-label={`Mover ${item.label}. Use as setas para cima e para baixo.`}
        onKeyDown={(event) => {
          if (event.key === "ArrowUp") {
            event.preventDefault();
            onMove(-DATA_TABLE_REORDER_STEP);
          }
          if (event.key === "ArrowDown") {
            event.preventDefault();
            onMove(DATA_TABLE_REORDER_STEP);
          }
        }}
        className="grid size-7 shrink-0 cursor-grab place-items-center rounded-sm text-muted-foreground transition-colors outline-none hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 active:cursor-grabbing active:bg-accent"
      >
        <GripVertical className="size-4" aria-hidden="true" />
      </button>
      <Checkbox
        size="sm"
        aria-label={item.label}
        checked={item.visible}
        onPointerDown={(event) => event.stopPropagation()}
        onCheckedChange={(checked) => onVisibleChange(checked === true)}
      />
      <span className="min-w-0 flex-1 truncate py-1.5 text-sm">{item.label}</span>
    </Reorder.Item>
  );
}
