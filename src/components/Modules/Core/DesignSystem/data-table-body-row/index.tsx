"use client";

import type { RowData } from "@tanstack/react-table";
import { motion } from "motion/react";

import type { DataTableRow } from "@/@types/Modules/Core/DesignSystem/data-table";
import { TableRow } from "@/components/ui/table";
import { DURATION_FAST, ENTER_OFFSET_Y, SPRING_SOFT } from "@/constants/Modules/Core/DesignSystem/motion";

import { DataTableBodyCell } from "../data-table-body-cell";

const MotionTableRow = motion.create(TableRow);

export function DataTableBodyRow<TData extends RowData>({
  row,
  sized,
  pinnedRowsKey,
}: {
  row: DataTableRow<TData>;
  sized: boolean;
  pinnedRowsKey: string;
}) {
  return (
    <MotionTableRow
      layout="position"
      layoutDependency={pinnedRowsKey}
      initial={{ opacity: 0, y: ENTER_OFFSET_Y }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -ENTER_OFFSET_Y, transition: { duration: DURATION_FAST } }}
      transition={SPRING_SOFT}
      data-state={row.getIsSelected() ? "selected" : undefined}
      data-pinned={row.getIsPinned() || undefined}
      className="group/row data-pinned:bg-muted/40"
    >
      {row.getVisibleCells().map((cell) => (
        <DataTableBodyCell key={cell.id} cell={cell} sized={sized} />
      ))}
    </MotionTableRow>
  );
}
